require('dotenv').config() //load all env variables from env

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('connected to database'))

app.use(express.json()) //server to accept json, use any middleware we want

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter) //localhosst:3000/subscribers/feofjeoe 


app.listen(3000, ()=> console.log('Server started'))