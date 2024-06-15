import express from "express";
import dotenv from 'dotenv'
import dbConnect from './lib/dbConnect.js'
import CustomError from "./utils/CustomError.js";
import CampgroundModel from "./models/Campground.js";
import validateCamp from "./validation/validateCamp.js";
import morgan from "morgan";

dotenv.config();
const app = express();




dbConnect().then().catch(() => console.log("db connection error"));
app.use(morgan(':method :url status- :status :response-time ms - :res[content-length]')) //logging requests with morgan
app.use(express.json());
app.use((req, res, next) => {   //setting CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', async (req, res) => {
    res.send("<h1>Hello world</h1>");
})

//get all camps
app.get('/camps', async (req, res, next) => {
    try {
        const camps = await CampgroundModel.find({});
        res.status(200).json({ success: true, message: "Fetched all camps", camps: camps })
    } catch (error) {
        next(new CustomError('Error fetching data from server', 500))
    }
})

//get single camp
app.get('/camps/:id', async (req, res, next) => {
    try {
        const exisitingCamp = await CampgroundModel.findById(req.params.id);
        if (exisitingCamp) {
            res.status(200).json({ success: true, message: "Campground fetching successful", camp: exisitingCamp })
        } else {
            res.status(404).json({ success: false, message: "Campground does not exist", camp: null })
        }
    } catch (error) {
        next(new CustomError('Error fetching data from server', 500))
    }
})

//create new camp
app.post('/camps', validateCamp, async (req, res, next) => {
    try {
        const newCamp = new CampgroundModel(req.body);
        await newCamp.save();
        res.status(200).json({ success: true, message: "Successfully created a new camp", camp: newCamp })
    } catch (error) {
        next(new CustomError('Error saving the campground data', 500))
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
            res.status(404).json({ success: false, message: "Camp does not exist", camp: null })
        }
    } catch (error) {
        next(new CustomError('Error updating campground data', 500))
    }
})

//delete single camp
app.delete('/camps/:id', async (req, res, next) => {
    try {
        const deletedCamp = await CampgroundModel.findByIdAndDelete(req.params.id);
        if (deletedCamp) {
            res.status(200).json({ success: true, message: "Successfully deleted the camp", camp: deletedCamp })
        } else {
            res.status(404).json({ success: false, message: "Camp does not exist", camp: null })
        }
    } catch (error) {
        next(new CustomError('Error deleting campground', 500))
    }
})



//error handler
app.use((err, req, res, next) => {
    const { message, status } = err;
    res.status(status || 500).json({
        success: false, message: message || "Internal server error",
        error: err.message
    });
})


app.listen(process.env.PORT, () => console.log("Listening on Port ", process.env.PORT));