const express = require('express')
const app = express()
const bcrypt =require("bcrypt")
const issueToken = require('../utils/jwt')
const Users = require('../models/Users')
const {upload} = require('../config/multer')

app.post('/login', async(req,res)=>{

    const {email,password} =req.body

    const user = await Users.findOne({
        email
    })


    if(!user){
        res.status(404).send('User Not Found')
    }else{

        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword) {
            const token = issueToken({_id: user._id, email: user.email})

            res.json({
                token
            })
        } else {
            res.status(404).send('Wrong Password')
        }
    }
})

app.post('/signup',async (req,res)=>{
    const {nom,prenom,email,password} =req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await Users.create({
        nom,
        prenom,
        email,
        password: hashedPassword
    })

    res.json({
        user
    })
})

module.exports= app