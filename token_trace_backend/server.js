require('dotenv').config()  

const express = require("express")
const app = express()
const PORT = 3000
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to database"))

app.use(express.json())

const factoryApiRoute = require('./routes/factoryapi')
app.use('/factory',factoryApiRoute)

const userApiRoute = require('./routes/userapi')
app.use('/user',userApiRoute)

const tokenApiRoute = require('./routes/tokenapi')
app.use('/token',tokenApiRoute)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))