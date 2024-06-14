import { z } from 'zod';
import campgroundValidation from '../schemas/campgroundValidation.js';
import CampgroundModel from '../models/Campground.js';

const validateCamp = (req, res, next) => {
    const newCamp = req.body;
    const result = campgroundValidation.safeParse(newCamp);
    if (!result.success) {
        const errorsArray = result.error.errors.map(err => err.message);
        console.log("Result of validating the new camp ->", errorsArray);
        res.status(404).json({ success: false, message: "validation failed", erros: errorsArray });
    }
    next();
}

export default validateCamp;