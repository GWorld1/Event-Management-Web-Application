import express from 'express'
import { login } from '../controller/login.controller.js'
import { createUser } from '../controller/signup.controller.js'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/token',(req,res) =>{
  const {token} = req.body;

  try{
    if(token === null || token === undefined || token === ""){
      return res.status(401).json({valid:false})
    }

  jwt.verify(token,"Secret key",(err)=>{
    if(err){
      return  res.status(403).json({valid:false})
    }else{
      return res.status(200).json({valid:true})
    }

    
}) 
  }catch(error){
    console.error(error)
  }
  
  
})
router.post('/signup',createUser);
router.post('/login',login);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  });

  export{
    router
}