const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema(
    {
        nom: String,
        prenom: String,
        url: String,
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: String

    },
    {
        timestamps: true
    }
)

const Users = mongoose.model('Users',UsersSchema)

module.exports= Users