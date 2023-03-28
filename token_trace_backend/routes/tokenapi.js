const express = require("express")
const router = express.Router()
const Token = require('../models/token')
const UserToToken = require('../models/userTokenMap')



//checks if token name is already there 
router.get('/isAvail/:id', async (req, res) => {
    try {
        const token = await Token.find({tokenName:req.params.id}).count()
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch Token"})
    }
})


//get all
router.get('/', async (req, res) => {
    try {
        const token = await Token.find()
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch Token"})
    }
})

//get one
router.get('/:id', getToken, (req, res) => {
    res.status(200).json(res.token)
})

//get token id
router.get('/getTokenId/:id', getToken, (req, res) => {
    res.status(200).json({id:res.token.tokenCount, userAddress: res.token.userAddress})
})

//create one
router.post('/create', async (req, res) => {
    const token = new Token({
        "tokenName": req.body.tokenName,
        "tokenAddress": req.body.tokenAddress,
        "createdBy": req.body.createdBy,
        "tokenCount": 0
    })
    try {
        const newToken = await token.save()
        res.status(201).json(newToken)
    } catch (error) {
        res.status(400).json({message: error.message} )
    }
})

//Mint a token one
router.post('/mint', async (req, res) => {
    const token = new Token({
        "userAddress": req.body.tokenName,
        "tokenAddress": req.body.tokenAddress,
        "tokenId": req.body.createdBy

    })
    try {
        const newToken = await token.save()
        res.status(201).json(newToken)
    } catch (error) {
        res.status(400).json({message: error.message} )
    }
})

//update one
router.patch('/:id',getToken, async (req, res) => {

    if(req.body.tokenCount != null){
        res.token.tokenCount = req.body.tokenCount
    }

    try {
        const updatedToken = await res.token.save()
        res.status(200).json(updatedToken)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


//delete one
router.delete('/:id', async (req, res) => {
    try {
        result = await Token.deleteOne({tokenName:req.params.id})
        res.json({message: `Deleted token ${req.params.id}`, res: result})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getToken(req, res, next){
    let token
    try {
        token = await Token.findOne({tokenName:req.params.id})
        if(token == null){
            return res.status(404).json({message: 'No token found'})
        }
    } catch (error) {
        return res.status(500).json({message: err.message})
    }
    res.token = token
    next()
}


module.exports = router