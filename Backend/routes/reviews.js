import { Router } from "express";
import validateReview from "../middleware/validateReview.js";
import validateCampForReview from "../middleware/validateCampForReview.js";
import { ServerError } from "../utils/ErrorClasses.js";
import ReviewModel from "../models/Review.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
const router = Router();


router.get('/:id', validateCampForReview, async (req, res, next) => {
    try {
        const { id } = req.params;
        const reviews = await ReviewModel.find({ campgroundId: id });
        return res.status(200).json({ success: true, message: "Successfully fetched all review for this campground", reviews })
    } catch (error) {
        console.log("Error fetching reviews", error)
        next(new ServerError('Error fetching review from DB'))
    }
})


//user must be logged in to post or delete reviews
router.use(isLoggedIn);

//create a new review
router.post('/:id', validateReview, validateCampForReview, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.token;
        const newReview = new ReviewModel({ ...req.body, campgroundId: id, authorId: userId });
        await newReview.save();
        return res.status(200).json({ success: true, message: "Review created successfully", review: newReview })
    } catch (error) {
        console.log("Error while creating a rweview", error)
        next(new ServerError('Error while creating a new review'))
    }
})

//delete Review
router.delete('/:id', async (req, res, next) => {
    try {
        const { reviewId } = req.body;
        const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
        if (deletedReview)
            return res.status(200).json({ success: true, message: "Review deleted successfully", review: deletedReview })
        else
            return res.status(400).json({ success: false, message: "Review or Campground do not exist", review: null })
    } catch (error) {
        console.log("Error while making delete mongoose request", error)
        next(new ServerError('Error while deleting review'))
    }
})

export { router }