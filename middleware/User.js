const mongoose = require("mongoose")
const Users = require("../models/Users")

const checkIfUserExist = async (req,res,next) =>{
    try{
        const _id = mongoose.Types.ObjectId(req.params)
        const user = await Users.findOne({_id})
        if (user){
            req._id =_id
            next()
        }else{
            res.status(404).json("User not found")
        }
    }
    catch(e){
        res.status('404').json("invalid Id")
        console.log(e);
    }

}

module.exports = {checkIfUserExist}