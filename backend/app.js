import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            // For requests with no origin (like mobile apps or curl requests)
            callback(null, true);
        } else if (allowedOrigins.some(url => origin.startsWith(url))) {
            // Allow origin if it starts with any of the allowed origins
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static("public"))

app.use(cookieParser())

//routes import 

import userRouter from './src/routes/user.route.js'

app.use("/api/v1/users", userRouter)

export {app}