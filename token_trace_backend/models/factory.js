const mongoose = require('mongoose')

const factorySchema = new mongoose.Schema({
    factoryId: {
        type: String,
        required: true,
        unique: true
    },
    factoryAddress:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Factory', factorySchema)