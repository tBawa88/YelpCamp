import reviewValidation from "../schemas/reviewValidation.js";

const validateReview = (req, res, next) => {
    const result = reviewValidation.safeParse(req.body);
    if (!result.success) {
        const errorsArray = result.error.errors.map(err => err.message);
        return res.status(400).json({ success: false, message: "Review validation failed", errors: errorsArray })
    }
    next();
}
export default validateReview;