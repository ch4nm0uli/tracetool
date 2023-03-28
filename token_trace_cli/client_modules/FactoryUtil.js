//internal imports
const Factory = require("../internal/factory")
const Token = require("../internal/token")
const User = require("./UserUtil")
const config = require("../internal/const/config.json")

//3pl
const axios = require("axios")
const { Contract } = require("ethers")
const apiUrl = config.apiUrl

const factoryUtil = {

    //Creates a new factory instance and registers the 
    //user with the given factoryId assoviated with factoryAddress
    RegisterNewFactory: async function (factoryId) {
        //check if factory id already taken
        let isAvail = await Factory.isAvailable(factoryId)
        if(!isAvail){
            console.error("Factory name already taken!"); 
            process.exit(1); 
        }
        let factoryAddress = ""
        try {
            factoryAddress = await Factory.createNewFactory()
        } catch (error) {
            console.error("Error in creating factory!")
            process.exit(1)
        }

        //send the factory id and address to the backend
        await axios({
            method: 'post',
            url: apiUrl + '/factory/create',
            data: {
                factoryId: factoryId,
                factoryAddress: factoryAddress.toString()
            }
        }).then((res) => {
            if (res.status == 201) {
                console.log(`Created a new factory ${factoryId} successfully.`)
            } else {
                console.error("Failed!")
                console.error(res.data)
            }
        })
    },

    //Enables a factory to create a new token type
    inventNewToken: async function(tokenName, FactoryId){

        let isAvail = await Token.isAvailable(tokenName)
        if(!isAvail){
            console.error("Token name already taken!"); 
            process.exit(1); 
        }
        let tokenAddress = ""
        try {
            tokenAddress = await Token.createNewToken(tokenName)
        } catch (error) {
            console.error("Error in creating token!")
            process.exit(1)
        }

        await axios({
            method: "post",
            url: apiUrl + "/token/create",
            data: {
                tokenName: tokenName,
                tokenAddress: tokenAddress,
                createdBy: FactoryId
            }
        }).then((res) => {
            if (res.status == 201) {
                console.log(`Created a new token ${tokenName} successfully.`)
            } else {
                console.error("Failed!")
                console.error(res.data)
            }
        })
        
    },

    //mints a single product having no raw materials
    singleMint: async function(userId, tokenName, factoryId){
        //get token address, token count
        let tokenAddress = ""
        let tokenCount = undefined
        await axios({
            method: "get",
            url: apiUrl + "/token/getTokenId/" + tokenName
        }).then((res) => {
            if(res.status == 200){
                tokenAddress = res.data.tokenAddress
                tokenCount = res.data.tokenCount
            }else{
                console.error("Error in fetching " + apiUrl + "/token/getTokenId/" + tokenName)
                process.exit(1)
            }
        })

        //get factory address
        let factoryAddress = ""
        await axios({
            method: "get",
            url: apiUrl + "/factory/" + factoryId
        }).then((res) => {
            if(res.status == 200){
                factoryAddress = res.data.factoryAddress
            }else{
                console.error("Error in fetching " + apiUrl + "/factory/" + factoryId)
                process.exit(1)
            }
        })

        //get factory contract instance
        let factoryContract = await Factory.getContractInstance(factoryAddress)

        //single mint the shit out of it
        await factoryContract.singleMint(tokenAddress, tokenCount)

        //update userToToken map
        let userAddress = await User.getUserAddressFromId(userId)
        await axios({
            method: "post",
            url: apiUrl + "/token/userToTokenMap",
            data: {
                userAddress: userAddress,
                tokenAddress: tokenAddress,
                tokenId: tokenCount
            }
        }).then((res) => {
            if(res.status == 201){
                console.log(`Updated user<${userId}, ${userAddress}> to token<${tokenAddress}, ${tokenCount}> map`)
            }else{
                console.error("Error in posting " + apiUrl + "/token/userToTokenMap")
                process.exit(1)
            }
        })


        //increment the tokenCount in db
        await axios({
            method: "patch",
            url: apiUrl + "/token/" + tokenName,
            data: {
                tokenCount: tokenCount + 1
            }
        }).then((res) => {
            if(res.status == 200){
                console.log("Updated token count.")
            }else{
                console.error("Error in patching " + apiUrl + "/token/" + tokenName)
                process.exit(1)
            }
        })
        
    },

    multiMint: async function(userId, tokenName, factoryId, rCount, rTokenNames, rTokenId){
        //check if all the r token address  and r token ids are in the db
        //get address for all the token names

        //get token address and token count
        //get factory address
        //get factory contract instance
        //multi mint the shit out of it
        //update user token map
        //increment token count in db
    },

    //Gets the factory owners address given the factoryId
    getOwner: async function(factoryId){
        let factoryAddress = ""
        await axios({
            method: 'get',
            url: apiUrl + "/factory/" + factoryId
        }).then((res) => {
            if(res.status == 200){
                factoryAddress = res.data.factoryAddress
                console.log("factoryAddress: ", factoryAddress)
            }else if(res.status == 404){
                console.error("Factory not found!")
                process.exit(1)
            }
        })

        let contract = await Factory.getContractInstance(factoryAddress)
        return await contract.getOwner()
    }

}


module.exports = factoryUtil
