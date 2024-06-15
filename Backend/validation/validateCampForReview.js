//Find out if the campground that this review is being sent to, even exists
import CampgroundModel from "../models/Campground.js"
import CustomError from "../utils/CustomError.js"

const validateCampForReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exisitingCamp = await CampgroundModel.findById(id);
        if (!exisitingCamp) {
            return res.status(400).json({ success: false, message: "Related Campground not found" })
        }
        next();
    } catch (error) {
        next(new CustomError('Error while finding camp related to Review', 500))
    }
}

export default validateCampForReview;