const express = require("express")
const router = express.Router()
const Factory = require('../models/factory')


//checks if factory name is already there 
router.get('/isAvail/:id', async (req, res) => {
    try {
        const factory = await Factory.find({factoryId:req.params.id}).count()
        res.status(200).json(factory)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch factory"})
    }
})


//get all
router.get('/', async (req, res) => {
    try {
        const factory = await Factory.find()
        res.status(200).json(factory)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch factory"})
    }
})

//get one
router.get('/:id', getFactory, (req, res) => {
    res.send(res.factory)
})

//create one
router.post('/create', async (req, res) => {
    const factory = new Factory({
        "factoryId": req.body.factoryId,
        "factoryAddress": req.body.factoryAddress
    })
    try {
        const newFactory = await factory.save()
        res.status(201).json(newFactory)
    } catch (error) {
        res.status(400).json({message: error.message} )
    }
})

//update one
router.patch('/:id',getFactory, async (req, res) => {

    console.log(req.body.factoryId)
    if(req.body.factoryId != null){
        res.factory.factoryId = req.body.factoryId
    }
    if(req.body.factoryAddress != null){
        res.factory.factoryAddress = req.body.factoryAddress
    }

    try {
        const updatedFactory = await res.factory.save()
        res.json(updatedFactory)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//delete one
router.delete('/:id', getFactory, async (req, res) => {
    try {
        result = await Factory.deleteOne({factoryId:req.params.id})
        res.json({message: `Deleted factory ${req.params.id}`, res: result})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getFactory(req, res, next){
    let factory
    try {
        factory = await Factory.findOne({factoryId:req.params.id})
        if(factory == null){
            return res.status(404).json({message: 'No factory found'})
        }
    } catch (error) {
        return res.status(500).json({message: err.message})
    }
    res.factory = factory
    next()
}


module.exports = router