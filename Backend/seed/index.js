import { places, descriptors } from "./seedHelpers.js";
import { cities } from "./cities.js";
import dbConnect from "../lib/dbConnect.js";
import CampgroundModel from "../models/Campground.js";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') }); //just to get access to .env file which is in the root dir

const getCampName = () => {
    const campIdx = Math.floor(Math.random() * descriptors.length);
    return descriptors[campIdx];
}

const getPlaceName = () => {
    const placeIdx = Math.floor(Math.random() * places.length);
    return places[placeIdx];
}

const getLocation = () => {
    const citiyIdx = Math.floor(Math.random() * cities.length);
    const city = cities[citiyIdx].city;
    const state = cities[citiyIdx].state;
    return `${city} , ${state}`;
}


const seedDB = async () => {
    await dbConnect();
    await CampgroundModel.deleteMany({}); //clearing previous entries
    try {
        for (let i = 0; i < 30; i++) {
            const newCamp = new CampgroundModel({
                title: `${getCampName()} ${getPlaceName()}`,
                location: getLocation(),
                price: Math.floor(Math.random() * 200),
                description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repellendus, atque quisquam, nisi deleniti eius expedita
                                voluptates laudantium facilis sit labore `,
                image: `https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            })
            await newCamp.save();
        }
    } catch (error) {
        console.log("Error while creating a document")
    }
}
seedDB()
    .then(data => {
        console.log("Seeding finished");
        process.exit(1);
    })
    .catch(e => console.log(e));