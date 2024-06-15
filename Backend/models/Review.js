import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    content: {
        type: String,
    },
    rating: {
        type: Number,
    },
    campgroundId: {
        type: Schema.Types.ObjectId,
        ref: 'Campground'
    }
})

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;