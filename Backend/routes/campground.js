import { Router } from "express";
import validateCamp from "../middleware/validateCamp.js";
import CampgroundModel from "../models/Campground.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import isAuthor from "../middleware/isAuthor.js";
import attachToken from "../middleware/attachToken.js";
import { NotFound, AuthError, ServerError } from "../utils/ErrorClasses.js";
const router = Router();


//get all camps
router.get('/', async (req, res, next) => {
    try {
        const camps = await CampgroundModel.find({});
        res.status(200).json({ success: true, message: "Fetched all camps", camps: camps })
    } catch (error) {
        next(error)
    }
})

/**
 * Along with the camp details, we're also including _id of current logged in user 
 * This info is used by frontend to display some conditional content (like delete and edit buttons)
 * The user can only perform those actions if userId and the author ID of campground matches
 */
router.get('/:id', attachToken, async (req, res, next) => {
    try {
        const exisitingCamp = await CampgroundModel.findById(req.params.id);
        if (!exisitingCamp) {
            return next(new NotFound('Campground not found'))
        }
        res.status(200).json({ success: true, message: "Campground fetching successful", camp: exisitingCamp, token: req.token || 'NULL' })
    } catch (error) {
        next(new ServerError('Error fetching data from server'))
    }
})

/**
 * This MW is enforcing user login and 
 * Also attaching token to the req object if it is included in the headers
 * 
 */
router.use(isLoggedIn) //---------------------------------------------------------------------

router.post('/', validateCamp, async (req, res, next) => {
    try {
        const campData = { ...req.body, authorId: req.token.userId };
        console.log("Camp data to ", campData)
        const newCamp = new CampgroundModel(campData);
        await newCamp.save();
        res.status(200).json({ success: true, message: "Successfully created a new camp", camp: newCamp, token: req.token })
    } catch (error) {
        next(new ServerError('Error saving the campground data'))
    }
})

//update single camp
router.patch('/:id', validateCamp, isAuthor, async (req, res, next) => {
    try {
        const updatedCamp = await CampgroundModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedCamp) {
            res.status(200).json({ success: true, message: "Successfully updated the camp", camp: updatedCamp })
        } else {
            res.status(404).json({ success: false, message: "Camp does not exist", camp: null })
        }
    } catch (error) {
        next(new ServerError('Error updating campground data'))
    }
})

//delete single camp
router.delete('/:id', isAuthor, async (req, res, next) => {
    try {
        const deletedCamp = await CampgroundModel.findByIdAndDelete(req.params.id);
        if (deletedCamp) {
            res.status(200).json({ success: true, message: "Successfully deleted the camp", camp: deletedCamp })
        } else {
            res.status(404).json({ success: false, message: "Camp does not exist", camp: null })
        }
    } catch (error) {
        next(new ServerError('Error deleting campground'))
    }
})

export { router };