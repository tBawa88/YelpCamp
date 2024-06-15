import mongoose, { Schema } from "mongoose";

const campgroundSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    image: {
        type: String,
        required: [true, "Image link is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    }
})

const CampgroundModel = mongoose.model("Campground", campgroundSchema);
export default CampgroundModel;