const express = require('express')
const passport = require('passport')
const app = express()
const Users = require('../models/Users')

app.get('/me',passport.authenticate('jwt'), (req,res)=>{
    res.send(req.user)
})

app.get('/', async (req,res)=>{
    const users = await Users.find()
    res.json(users)
})

module.exports= app