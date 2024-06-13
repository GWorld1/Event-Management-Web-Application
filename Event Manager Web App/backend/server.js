/* eslint-disable no-undef */
import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import { router as EventRoutes } from "./routes/event.routes.js";
import { router as AuthRoutes } from "./routes/auth.routes.js";
import {router as CartRoutes} from "./routes/cart.routes.js"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config({
    path:'./.env' //give .env file location
});
const port = process.env.PORT;
const mongodb = process.env.MONGO_DB;
//import { mongodb_connection,port } from "../../config.js";



//Create Web Server Insatnce using express.js
const app = express();


//Middleware
app.get('/',(req,res) =>{res.json("Working Backend")})
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use('/api/events',EventRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/cart',CartRoutes)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use((req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin",`${process.env.FRONTEND_URL}` ); // Replace with your frontend domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

  // Pass to next layer of middleware
  next();
});
//Connect to MongoDB

mongoose.connect(mongodb)
.then(()=>{
    
    console.log("Connected to Database");
    app.listen(port,()=>{
        console.log(`Server listening on port ${port}`)
    })
})
.catch(()=>{
    console.log('Connection to database failed')
})