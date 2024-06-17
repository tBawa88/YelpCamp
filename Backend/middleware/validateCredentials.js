import { signUpSchema } from "../schemas/signUpSchema.js"
import { AuthError } from "../utils/ErrorClasses.js";
const validateCredentials = (req, res, next) => {
    const user = req.body;
    const result = signUpSchema.safeParse(user);
    if (!result.success) {
        const errorsArray = result.error.errors.map(err => err.message);
        console.log("Result of validating the new camp ->", errorsArray);
        // return res.status(404).json({ success: false, message: "User credentials are invalid", errors: errorsArray });
        return next(new AuthError('User credentials not valid'))
    }
    next();
}
export default validateCredentials;