require("dotenv").config()

const mongoose = require('mongoose')

require('./Users')


const connectDb = () =>{
    
    mongoose.connect(`mongodb://${process.env.URL}:${process.env.PORT}/Upload`)

    const db = mongoose.connection

    db.on('error', () => {
      console.log('error')
    })
  
    db.once('open', () => {
      console.log('connected to db')
    })
  }

connectDb()