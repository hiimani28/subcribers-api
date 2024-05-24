const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


// getting all subscribers
router.get('/', async (req,res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({message : err.message }) //500 - error on server

    }

})

// getting one subscriber
router.get('/:id', (req,res)=>{

    res.send(req.params.id)
    // res.json(subscribers)
})

//create 

router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)

    } catch(err) {
        res.status(400).json({message: err.message}) //fails if bad data sent by the uswer

    }

    
})
//updating
router.patch('/', (req,res)=>{

    
})

//delete
router.delete('/:id', (req,res)=>{

    
})
async function getSubscriber(req,res, next ) {
    let subscriber
    try {
    subscriber = await Subscriber.findById(req.params.id)
    if(subscriber == null) {
        return res.status(404).json({message: 'Cannot find subscriber'}) //cant find 
    }

} catch{

}
}


module.exports = router