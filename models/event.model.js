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

export const Event = mongoose.model('Event',eventSchema);

