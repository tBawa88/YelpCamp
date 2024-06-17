//This MW will check if the LOGGED IN user, that wants to DELETE OR PATCH some resource, the same as it's author

import CampgroundModel from "../models/Campground.js";
import { AuthError, NotFound, ServerError } from "../utils/ErrorClasses.js";

const isAuthor = async (req, res, next) => {
    const userId = req.token.userId;
    console.log("User that wants to delete", userId)
    try {
        const camp = await CampgroundModel.findById(req.params.id);
        if (!camp)
            return next(new NotFound('Campground not found'))
        console.log("Author of the camp", camp.authorId.toString())
        if (userId !== camp.authorId.toString())
            return next(new AuthError("User not authenticated"))
        next();
    } catch (error) {
        next(new ServerError('Something went wrong while verifying author'))
    }
}
export default isAuthor;