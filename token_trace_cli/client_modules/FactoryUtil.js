//internal imports
const Factory = require("../internal/factory")
const Token = require("../internal/token")
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
        await axios({
            method: "get",
            
        })
        //get factory address
        //get factory contract instance
        //single mint the shit out of it
        //update userToToken map
        //increment the tokenCount in db
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
