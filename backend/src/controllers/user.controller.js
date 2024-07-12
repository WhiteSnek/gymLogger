import { asyncHandler } from "../utils/asyncHanlder.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Plan } from "../models/plan.model.js";
import jwt from "jsonwebtoken";
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

const addPlan = asyncHandler( async(req,res)=>{
  const { details } = req.body;
    const userId = req.user._id;
    const plan = await Plan.create(details)
    if(!plan) throw new ApiError(400,'Error creating plan')
    const user = await User.findByIdAndUpdate(userId, { $push: { plans: plan._id } });
    if(!user) throw new ApiError(404,'User not found')
    return res.status(200).json(new ApiResponse(200, {}, 'Plan added successfully'));
})

export { loginUser, logoutUser, registerUser, addPlan };
