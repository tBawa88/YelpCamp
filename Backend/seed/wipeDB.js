import dbConnect from "../lib/dbConnect.js";
import ReviewModel from "../models/Review.js";
import CampgroundModel from "../models/Campground.js";
import UserModel from "../models/User.js";

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config();

const wipeDB = async () => {
    await dbConnect();
    const camps = await CampgroundModel.deleteMany({});
    const reviews = await ReviewModel.deleteMany({});
    // const users = await UserModel.deleteMany({});
}

wipeDB()
    .then(() => {
        console.log("DB wiped")
        process.exit(1);
    })
    .catch(e => console.log("Error while wiping the DB", e));