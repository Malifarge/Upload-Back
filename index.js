require('dotenv').config()

const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const PORT = 5000
const authRoutes = require('./routes/auth')

require('./config/passport')
require('./models')

app.use(cors())

app.use(express.json())

app.use(express.static('public'))

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
})
)

app.use('/auth',authRoutes)

app.listen(PORT,()=>{
    console.log(`Serveur running on ${PORT}`);
})