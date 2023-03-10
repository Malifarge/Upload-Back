const express = require('express')
const app = express()
const bcrypt =require("bcrypt")
const issueToken = require('../utils/jwt')
const Users = require('../models/Users')
const {upload} = require('../config/multer')
const { checkIfUserExist } = require('../middleware/User')

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

app.post('/:id',upload.single('profil_picture'),checkIfUserExist,async (req,res)=>{
    const {_id} =req
    const user = await Users.updateOne(
        {_id},{profile_picture:`http://localhost:5000/${req.file.filename}`}
    )
    res.status(200).json(user)
})

module.exports= app