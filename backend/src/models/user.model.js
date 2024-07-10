import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    weight: {
        type: Number
    },
    googleId: {
        type: String
    },
    refreshToken: {
        type: String
    },
    plans: [
        {
            type: Schema.Types.ObjectId,
            ref: "Plan"
        }
    ]
},
{
    timestamps: true
});


userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        // Ensure googleId is not set when password is modified
    }
    if (this.isModified("googleId")) {
        this.googleId = await bcrypt.hash(this.googleId, 10);
        // Ensure password is not set when googleId is modified
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    if (!this.password) return false; // Handle case where password is not set
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isGoogleIdCorrect = async function(googleId) {
    if (!this.googleId) return false; // Handle case where googleId is not set
    return await bcrypt.compare(googleId, this.googleId);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            name: this.name,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);
