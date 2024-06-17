import express from "express";
import dotenv from 'dotenv'
import dbConnect from './lib/dbConnect.js'

import morgan from "morgan";
import { router as campRoutes } from "./routes/campground.js";
import { router as reviewsRoutes } from "./routes/reviews.js";
import { router as authRoutes } from "./routes/auth.js";
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



app.use('/camps', campRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/auth', authRoutes)




//error handler
app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong on Server"
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message,
    });
})


app.listen(process.env.PORT, () => console.log("Listening on Port ", process.env.PORT));