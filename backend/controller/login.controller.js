import { User } from "../models/user.model.js";
import bycrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const createSecretToken = (id) =>{
    return jwt.sign({id},"Secret key",{
        expiresIn:3*24*60*60
    });
}

export const login = async (req,res) =>{
    const {email,password} = req.body;
    if (email == null || password == null) {
        return res.status(400).json({ message: "All input is required" });
    }

    const user = await User.findOne({email:email});
   
   // console.log(user)

    

    try{
        if(!user){
            return res.status(401).json({ message: "User doesn't exist" });
        }else
        if(!(email && (await bycrypt.compare(password,user.password)))){
            return res.status(402).json({ message: "Invalid credentials" });  
        }
        const token = createSecretToken(user._id)
    
        res.cookie("token", token, {
            domain: "http://localhost:3000/", // Set your domain here
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
            secure: true, // Cookie will only be sent over HTTPS
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            sameSite: "None",
          });
    
        res.send(token);
    }catch(error){
        console.error(error)
    }
    
}