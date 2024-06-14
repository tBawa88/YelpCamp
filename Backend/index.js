import express from "express";
import dotenv from 'dotenv'
import dbConnect from './lib/dbConnect.js'
import CampgroundModel from "./models/Campground.js";
import validateCamp from "./validation/validateCamp.js";
import morgan from "morgan";

dotenv.config();
const app = express();




dbConnect().then().catch(() => console.log("db connection error"));
app.use(morgan(':method :url status- :status :response-time ms - :res[content-length]'))
app.use(express.json());

app.get('/', async (req, res) => {
    res.send("<h1>Hello world</h1>");
})

//get all camps
app.get('/camps', async (req, res, next) => {
    try {
        const camps = await CampgroundModel.find({});
        res.status(200).json({ success: true, message: "Fetched all camps", camps: camps })
    } catch (error) {
        next(error);
    }
})

//get single camp
app.get('/camps/:id', async (req, res, next) => {
    try {
        const exisitingCamp = await CampgroundModel.findById(req.params.id);
        if (!exisitingCamp) {
            res.status(404).json({ success: false, message: "Campground does not exist", camp: null })
        }
        res.status(200).json({ success: true, message: "Campground fetching successful", camp: exisitingCamp })
    } catch (error) {
        next(error);
    }
})

//create new camp
app.post('/camps', validateCamp, async (req, res, next) => {
    try {
        const newCamp = new CampgroundModel(req.body);
        await newCamp.save();
        res.status(200).json({ success: true, message: "Successfully created a new camp", camp: newCamp })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error creating a new camp", camp: null })
    }
})

//update single camp
app.patch('/camps/:id', validateCamp, async (req, res, next) => {
    try {
        const updatedCamp = await CampgroundModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedCamp) {
            res.status(200).json({ success: true, message: "Successfully updated the camp", camp: updatedCamp })
        } else {
            res.status(404).json({ success: false, message: "camp does not exists", camp: null })
        }
    } catch (error) {
        next(error);
    }
})

//delete single camp
app.delete('/camps/:id', async (req, res, next) => {
    try {
        const data = await CampgroundModel.findByIdAndDelete(req.params.id);
        if (data) {
            res.status(200).json({ success: true, message: "Successfully deleted the camp", camp: data })
        } else {
            res.status(404).json({ success: false, message: "Camp does not exist", camp: null })
        }
    } catch (error) {
        next(error);
    }
})




app.use((err, req, res, next) => {
    console.log("Oops, Error wile fetching the data ->", err);
    res.status(500).json({ success: false, message: 'Server error', error: err })
})


app.listen(process.env.PORT, () => console.log("Listening on Port ", process.env.PORT));