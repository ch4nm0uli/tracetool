const express = require("express")
const router = express.Router()
const UserToToken = require('../models/userTokenMap')



//get all
router.get('/', async (req, res) => {
    try {
        const userToToken = await UserToToken.find()
        res.status(200).json(userToToken)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch Token"})
    }
})

//get one
router.get('/isvalid/:tokenAddress/:tokenId', getUserToToken, (req, res) => {
    res.status(200).json(res.u2t)
})

//update user address
router.patch('/:tokenAddress/:tokenId',getUserToToken, async (req, res) => {

    if(req.body.userAddress != null){
        res.u2t.userAddress = req.body.userAddress
    }

    try {
        const updatedMap = await res.u2t.save()
        res.status(200).json(updatedMap)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//delete all
router.delete('/all', async (req, res) => {
    console.log("delete triggered")
    try {
        result = await UserToToken.deleteMany({})
        res.json({message: `Deleted usertokenmap DB`, res: result})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Mint a token one
router.post('/userToTokenMap', async (req, res) => {
    const userToToken = new UserToToken({
        "userAddress": req.body.userAddress,
        "tokenAddress": req.body.tokenAddress,
        "tokenId": req.body.tokenId  
    })
    try {
        const newUserToToken = await userToToken.save()
        res.status(201).json(newUserToToken)
    } catch (error) {
        res.status(400).json({message: error.message} )
    }
})

async function getUserToToken(req, res, next){
    let u2t
    try {
        u2t = await UserToToken.findOne({tokenAddress:req.params.tokenAddress, tokenId: Number(req.params.tokenId)})
        if(u2t == null){
            return res.status(404).json({message: 'No user to token map found'})
        }
    } catch (error) {
        return res.status(500).json({message: err.message})
    }
    res.u2t = u2t
    next()
}

module.exports = router