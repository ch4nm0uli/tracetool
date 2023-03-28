const mongoose = require('mongoose')

const userToToken = new mongoose.Schema({
    userAddress:{
        type: String,
        required: true
    },
    tokenAddress: {
        type: String,
        required: true
    },
    tokenId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserToToken', userToToken)