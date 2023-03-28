const express = require("express")
const router = express.Router()
const User = require('../models/user')



//check if an user eth account is already linked
router.get('/isAddrAvail/:addr', async (req, res) => {
    try {
        const user = await User.find({userAddress:req.params.addr}).count()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch factory"})
    }
})


//checks if user name is already there 
router.get('/isAvail/:id', async (req, res) => {
    try {
        const user = await User.find({userId:req.params.id}).count()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch factory"})
    }
})


//get all
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch user"})
    }
})

//get one
router.get('/:id', getUser, (req, res) => {
    res.status(200).json(res.user)
})

//create one
router.post('/create', async (req, res) => {
    const user = new User({
        "userId": req.body.userId,
        "userAddress": req.body.userAddress
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message} )
    }
})

//update one
router.patch('/:id',getUser, async (req, res) => {

    if(req.body.userId != null){
        res.user.userId = req.body.userId
    }
    if(req.body.userAddress != null){
        res.user.userAddress = req.body.userAddress
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//delete one
router.delete('/:id', async (req, res) => {
    try {
        result = await User.deleteOne({userId:req.params.id})
        res.json({message: `Deleted user ${req.params.id}`, res: result})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getUser(req, res, next){
    let user
    try {
        user = await User.findOne({userId:req.params.id})
        if(user == null){
            return res.status(404).json({message: 'No user found'})
        }
    } catch (error) {
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}


module.exports = router