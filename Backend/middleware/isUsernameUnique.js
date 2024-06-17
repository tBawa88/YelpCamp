import UserModel from "../models/User.js";
import { AuthError, ServerError } from "../utils/ErrorClasses.js";
const isUsernameUnique = async (req, res, next) => {
    try {
        const { username } = req.body;
        const exisitingUser = await UserModel.findOne({ username });
        if (exisitingUser)
            return next(new AuthError('Username already exists'))
        // return res.status(401).json({ success: false, message: 'Username already exisits' })
        next();
    } catch (error) {
        next(new ServerError("something went wrong while fetching user"));
    }
}

export default isUsernameUnique;