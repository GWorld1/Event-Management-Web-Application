/* eslint-disable no-unused-vars */
import express from 'express'
import { Event } from '../models/event.model';

const router = express.Router();


//Api Call to retrieve all event 
router.get('/',async (req,res) =>{
    try{
        const events = await Event.find();
        res.status(200).json({message: "Event retrieved Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Api Call to create new event

router.post('/',async (req,res)=>{
    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        reminder: req.body.reminder || false,
    });

    try {
        const new_event = event.save()
        res.status(200).json(new_event);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Api Call to delete an event
router.delete('/:id',async (req,res)=>{
    try {

        const {id} = req.params
        await Event.findByIdAndDelete(id)
        console.log('Event Deleted')
        res.status(200).json({message: "Event deleted Successfully"})

    } catch (error) {

        res.status(500).json({message: error.message})

    }
})

//Api Call to Update an event

router.put('/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const event = await Event.findByIdAndUpdate(id,req.body)
        
        console.log('Event Updated Success')
        const updated_event = await Event.findById(id)

        res.status(200).json(updated_event)

    } catch (error) {

        res.status(500).json({message: error.message})

    }
})

export{
    router
}