import { signInSchema } from "../schemas/siginInSchema.js";
import { AuthError } from "../utils/ErrorClasses.js";

export const validateSignIn = (req, res, next) => {
    const user = req.body;
    const result = signInSchema.safeParse(user);
    if (!result.success) {
        const errorsArray = result.error.errors.map(err => err.message);
        console.log("Result of validating the new camp ->", errorsArray);
        return next(new AuthError('User credentials are invalid'))
        // return res.status(404).json({ success: false, message: "User credentials are invalid", errors: errorsArray });
    }
    next();
}

export default validateSignIn