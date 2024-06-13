import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const createSecretToken = (id) =>{
    return jwt.sign({id},"Secret key",{
        expiresIn:3*24*60*60
    });
}

export const createUser = async (req, res) => {

    
    try {
        const {username,password,email} = req.body
      if (
        !(
          username &&
          password &&
          email
        )
      ) {
        res.status(400).send("All input is required");
      }
  
      const oldUser = await User.findOne({ email: email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      const token = createSecretToken(user._id);
  
      res.cookie("token", token, {
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
      });
  
      //console.log("cookie set succesfully");
  
      res.json(user);
    } catch (error) {
      console.log("Gott an error", error);
      res.status(400).json({message:error.message})
    }
  };