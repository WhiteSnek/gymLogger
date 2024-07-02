import {asyncHandler} from '../utils/asyncHanlder.js';
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler( async (req,res)=>{
    // get user details from front end
    const {fullname,email,username,password,age,gender} = req.body 
    // validation - not empty
    if(
        [fullname,email,username,password,age,gender].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists: username and email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(existedUser) throw new ApiError(409,"User with email or username exists")

    // check for images
    const avatarLocalPath = req.file?.path;

    // check for avatar
    if(!avatarLocalPath) throw new ApiError(400,"Avatar file is required")

    // upload them to cloudinary, avatar 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar) throw new ApiError(400,"Avatar file is required on cloudinary")

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase(),
        age,
        gender
    })

    // remove password and refrest token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
    // check for usr creation 
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
    
    
})

const loginUser = asyncHandler( async (req,res)=>{
    // req body se data le aao
    const {email,username,password} = req.body
    
    // username or email
    if(!username && !email){
        throw new ApiError(400, "Username or Email is required")
    }

    // find the user
    const user = await User.findOne({
        $or : [{username},{email}]
    })
    if(!user){
        throw new ApiError(401, "User does not exist")
    }

    // password check
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) throw new ApiError(401, "Invalid User credentials")

    // access and refresh token generate
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    // send cookies
    const loggendInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggendInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )

})

const logoutUser = asyncHandler( async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

export {
    loginUser,
    logoutUser,
    registerUser
}