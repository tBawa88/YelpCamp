//Find out if the campground that this review is being sent to, even exists
import CampgroundModel from "../models/Campground.js"
import { ServerError } from "../utils/ErrorClasses.js";

const validateCampForReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exisitingCamp = await CampgroundModel.findById(id);
        if (!exisitingCamp) {
            return res.status(400).json({ success: false, message: "Related Campground not found" })
        }
        next();
    } catch (error) {
        next(new ServerError('Error while finding camp related to Review'))
    }
}

export default validateCampForReview;