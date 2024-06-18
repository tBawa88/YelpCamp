import { Router } from "express";
import UserModel from "../models/User.js";
import isUsernameUnique from "../middleware/isUsernameUnique.js";
import validateCredentials from "../middleware/validateCredentials.js";
import { createRequire } from 'module'
import { createJSONToken } from "../utils/authHelpers.js";
import { AuthError, ServerError } from "../utils/ErrorClasses.js";
import validateSignIn from "../middleware/validateSignIn.js";
const require = createRequire(import.meta.url);
const { hash, compare } = require('bcryptjs')



const router = Router();

router.post('/signup', validateCredentials, isUsernameUnique, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashed = await hash(password, 10);
        const newUser = new UserModel({ username, password: hashed });
        //create a jwt and attach it to the response
        const token = createJSONToken(newUser._id.toString());
        await newUser.save();
        return res.status(200).json({ success: true, message: "User created successfully", token })
    } catch (error) {
        next(new ServerError('Something went wrong while creating a user'));
    }
})


router.post('/signin', validateSignIn, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log("inside signin route, user", req.body)
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser)
            return next(new AuthError("Invalid credentials"))
        const isPasswordCorrect = await compare(password, existingUser.password)
        if (!isPasswordCorrect) {
            return next(new AuthError("Invalid credentials"))
        }

        const token = createJSONToken(existingUser._id.toString());
        return res.status(200).json({ success: true, message: "User logged in successfully", token })

    } catch (error) {
        next(new ServerError('Something went wrong while signin'))
    }
})

export { router }