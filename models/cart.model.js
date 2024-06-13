/* eslint-disable no-undef */
import mongoose from "mongoose";

const eventSchema = new  mongoose.Schema(
    {
        title:{ type: String , required: true},
        description:{type: String , required:true},
        category:{type:String , required:true},
        img: {type:String ,required:true},
        email:{type:String, required:false}
    },
    {timestamps:true}
)

const CartSchema = new mongoose.Schema({
    email:{type:String},
    events: [eventSchema],
    total: {
      type: Number,
      default: 0
    }
  });
  
  export const Cart = mongoose.model('Cart', CartSchema);
  

  