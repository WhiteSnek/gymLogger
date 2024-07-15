import { asyncHandler } from "../utils/asyncHanlder.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Plan } from "../models/plan.model.js";
import { Schedule } from "../models/schedule.model.js";
import { Muscle } from "../models/muscle.model.js";
import { Exercise } from "../models/exercise.model.js";
import { Set } from "../models/set.model.js";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from front end
  const { name, email, username, password, googleId, age, gender, weight,googleImg } = req.body;
  console.log(password,googleId)
  // validation - ensure required fields are not empty
  if (
    [name, email, username, age, gender, weight].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure either password or googleId is provided, but not both
  if (!password) {
    throw new ApiError(400, "password is required");
  }

  // check if user already exists: username and email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser)
    throw new ApiError(409, "User with email or username exists");

  // check for images
  const avatarLocalPath = req.file?.path;
  // check for avatar
  if (!avatarLocalPath && !googleImg) throw new ApiError(400, "Avatar file is required");

  // upload avatar to cloudinary
  if(avatarLocalPath){
    const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) throw new ApiError(400, "Avatar file is required on cloudinary");
  }
  

  // create user object - create entry in db
  const user = await User.create({
    name,
    avatar: avatarLocalPath ? avatar.url : googleImg,
    email,
    password: password,
    googleId: googleId,
    username: username.toLowerCase(),
    age,
    gender,
    weight
  });

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-refreshToken"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body se data le aao
  const { email, username, password, googleId } = req.body;

  // username or email
  if (!username && !email) {
    throw new ApiError(400, "Username or Email is required");
  }

  // find the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(401, "User does not exist");
  }

  // password check
  if (password) {
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid User credentials");
  }
  // googleId check
  if (googleId) {
    const isGoogleIdValid = await user.isGoogleIdCorrect(googleId);
    if (!isGoogleIdValid) throw new ApiError(401, "Invalid User credentials");
  }

  // access and refresh token generate
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // send cookies
  const loggendInUser = await User.findById(user._id).select(
    "-password -refreshToken -googleId"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggendInUser,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});


const addPlan = asyncHandler(async (req, res) => {
  const { planData, planName } = req.body;
  const userId = req.user._id;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Create Sets
    const setIds = [];
    for (const schedule of planData) {
      for (const muscle of schedule.muscles) {
        for (const exercise of muscle.exercises) {
          const sets = await Set.insertMany(exercise.exercise.sets, { session });
          if(!sets) throw new ApiError(400,"Error adding sets")
          setIds.push(sets.map(set => set._id));
        }
      }
    }

    // Step 2: Create Exercises
    const exerciseIds = [];
    let setIndex = 0;
    for (const schedule of planData) {
      for (const muscle of schedule.muscles) {
        for (const exercise of muscle.exercises) {
          const newExercise = new Exercise({
            name: exercise.exercise.value,
            sets: setIds[setIndex],
          });
          if(!newExercise) throw new ApiError(400,"Error adding exercise")
          await newExercise.save({ session });
          exerciseIds.push(newExercise._id);
          setIndex++;
        }
      }
    }

    // Step 3: Create Muscles
    const muscleIds = [];
    let exerciseIndex = 0;
    for (const schedule of planData) {
      for (const muscle of schedule.muscles) {
        const newMuscle = new Muscle({
          name: muscle.name,
          exercises: exerciseIds.slice(exerciseIndex, exerciseIndex + muscle.exercises.length),
        });
        if(!newMuscle) throw new ApiError(400,"Error adding muscle")
        await newMuscle.save({ session });
        muscleIds.push(newMuscle._id);
        exerciseIndex += muscle.exercises.length;
      }
    }

    // Step 4: Create Schedules
    const scheduleIds = [];
    let muscleIndex = 0;
    for (const schedule of planData) {
      const newSchedule = new Schedule({
        day: schedule.day,
        muscles: muscleIds.slice(muscleIndex, muscleIndex + schedule.muscles.length),
      });
      if(!newSchedule) throw new ApiError(400,"Error adding schedule")
      await newSchedule.save({ session });
      scheduleIds.push(newSchedule._id);
      muscleIndex += schedule.muscles.length;
    }

    // Step 5: Create Plan
    const newPlan = new Plan({
      name: planName, 
      schedule: scheduleIds,
    });
    if(!newPlan) throw new ApiError(400,"Error adding plan")
    await newPlan.save({ session });

    // Step 6: Update User
    const user = await User.findById(userId).session(session);
    user.plans.push(newPlan._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json(new ApiResponse(200, { planId: newPlan._id }, 'Plan added successfully'));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400, error)
  }
});


const getPlanInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId)
      .populate({
        path: 'plans',
        populate: {
          path: 'schedule',
          populate: {
            path: 'muscles',
            populate: {
              path: 'exercises',
              populate: {
                path: 'sets'
              }
            }
          }
        }
      }).select("-password -googleId -refreshToken");

    if (!user) {
      throw new ApiError(400,"Error fetching plan info")
    }

    return res.status(200).json(new ApiResponse(200, user, 'User data retrieved successfully'));
  } catch (error) {
    throw new ApiError(400,error)
  }
});


export { loginUser, logoutUser, registerUser, addPlan, getPlanInfo };
