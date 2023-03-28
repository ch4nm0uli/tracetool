const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    tokenAddress: {
        type: String,
        required: true
    },
    tokenName:{
        type: String,
        required: true,
        unique: true
    },
    createdBy:{
        type: String,
        required: true
    },
    tokenCount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Token', tokenSchema)