import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    },
    rating: {
        type: number,
    }
})

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;