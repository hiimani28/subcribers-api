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
router.get('/:id', getSubscriber,(req,res)=>{
    res.json(res.subscriber)

    // res.send(res.subscriber.name) // get name of subscriber
    // res.json(subscribers)
})

//create 

router.post('/',async (req,res)=>{
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
router.patch('/:id', getSubscriber, async  (req,res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await  res.subscriber.save()
        res.json(updatedSubscriber)
    } catch(er){
        res.status(400).json({message:err.message})

    }
})

//delete
router.delete('/:id',getSubscriber, async (req,res)=>{
    try {
        await res.subscriber.deleteOne()
        res.json({message : 'deleted subscriber'})
    } catch (err){
        res.status(500).json({message: err.message})
    } 
})


async function getSubscriber(req,res, next ) {
    let subscriber
    try {
    subscriber = await Subscriber.findById(req.params.id)
    if(subscriber == null) {
        return res.status(404).json({message: 'Cannot find subscriber'}) //cant find 
    }

} catch (err){
    return res.status(500).json({messsage : err.message})

}

res.subscriber  = subscriber
next() // move on to the next part of the request or middleware
}


module.exports = router