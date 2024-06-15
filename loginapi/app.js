import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import routes from './routes/index.js';
import {model, validate} from './models/index.js';

// Initializing the express framework
const app = express();
// connection with the mongoDB database
mongoose.connect('mongodb+srv://hinalpatel21:hinal@cluster0.vnkdiqa.mongodb.net/?retryWrites=true&w=majority');
// Using Express functionalities
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors());
// calling the routes in the app
routes(app);


export default app;