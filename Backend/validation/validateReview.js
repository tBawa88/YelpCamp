import reviewValidation from "../schemas/reviewValidation.js";

const validateReview = (req, res, next) => {
    const { content, rating } = req.body;
    const result = reviewValidation.safeParse({ content, rating });
    if (!result.success) {
        const errorsArray = result.error.errors.map(err => err.message);
        console.log("Result of validating the review ->", errorsArray);
        return res.status(400).json({ success: false, message: "Review validation failed", errors: errorsArray })
    }
    next();
}
export default validateReview;