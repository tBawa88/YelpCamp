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
        required: [true, "Locatoin is required"]
    },
    description: {
        type: String,
        required: [true, "Desription is required"]
    }
})

const CampgroundModel = mongoose.model("Campgroud", campgroundSchema);
export default CampgroundModel;