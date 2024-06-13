/* eslint-disable no-unused-vars */
import express from 'express'
import {Cart} from '../models/cart.model.js'
const router = express.Router();
// Add an event to the cart
router.post('/events', async (req, res) => {
    const { event,email } = req.body;
  
    try {
      let cart = await Cart.findOne({email:email});
      //console.log(cart)
      if (!cart) {
        cart = new Cart();
        cart.email = email;
      }
  
      cart.events.push(event);
      cart.total += 1;
  
       cart.save();
  
      res.status(201).json({ message: 'Event added to cart successfully', cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
router.get('/events/:email',async(req,res)=>{
    const email = req.params.email;
    //console.log(email);
    try{
        const cart_list  =  await Cart.find({email:email})

        if(cart_list == null){
          return res.status(401).json({ message: "Cart Empty" });
        }
        res.status(201).send(cart_list);
    }catch(error){
        res.status(500).json({ message: 'Server error', error });
    }
   

})
  // Delete an event from the cart
router.delete('/events/:eventId/:title', async (req, res) => {
  const { title, eventId } = req.params;

  try {
    const cart = await Cart.findByIdAndUpdate(eventId, {
      $pull: { events: { title: title } },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });

  export{
    router
}