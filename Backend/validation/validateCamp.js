import campgroundValidation from '../schemas/campgroundValidation.js';

const validateCamp = (req, res, next) => {
    const newCamp = req.body;
    const result = campgroundValidation.safeParse(newCamp);
    if (!result.success) {
        const errorsArray = result.error.errors.map(err => err.message);
        console.log("Result of validating the new camp ->", errorsArray);
        return res.status(404).json({ success: false, message: "Validation failed", erros: errorsArray });
    }
    next();
}

export default validateCamp;