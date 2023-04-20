
//internal imports
// const Token = require("../internal/token")
const config = require("../internal/const/config.json")
const User = require("../internal/user")
const Token = require("../internal/token")
const ipfs_lib = require("../internal/ipfs_lib")

//3pl
const axios = require("axios")
const Factory = require("../internal/factory")

const apiUrl = config.apiUrl

const tokenUtil = {

    transferToken: async function(to, tokenName, tokenId, metadata){
        // get address of to
        const toAddress = await User.getUserAddressFromId(to)

        // get address of token
        const tokenAddress = await tokenUtil.getTokenAddressFromName(tokenName)

        // get token instance
        const tokenInstance = await Token.getContractInstance(tokenAddress)

        // store meta data in ipfs and get cid
        const cid = await ipfs_lib.AddData(metadata)

        // transfer the token TransferTo(id, to)
        try {
            await tokenInstance.TransferTo(tokenId, toAddress, cid)
        } catch (error) {
            console.error("Error occured while transfering!" + error)   
            process.exit(1)
        }

        // update the usertotoken map (change the user address to 'to' address)
        await axios({
            method: "patch",
            url: apiUrl + "/user2token/" + tokenAddress + "/" + tokenId,
            data:{
                userAddress: toAddress
            }
        }).then((res) => {
            if(res.status == 200){
                console.log("Updated user to token map.")
            }else{
                console.error("Failed to patch " + apiUrl + "/user2token/" + tokenId + "/" + tokenAddress )
                process.exit(1)
            }
        }).catch((err) => {
            console.error(err.response.data)
        })
    },
    traceItem: async function(tokenName, tokenId){
        // {
        //     tokenAddress: "gfds",
        //     tokenName: "token_1",
        //      tokenId: 
        //     factoryAddress: "facfaer32",
        //     factoryId: "factory_1",
        //     TransferLogs: [{from: , to: }, ...], // index 0 the first transfer
        //     rawMaterials: [{id, address, name}, {}...apiUrl.at.]            
        // }
        let trace = {}
        // get token address from name
        const tokenAddress = await tokenUtil.getTokenAddressFromName(tokenName)
        trace.tokenAddress = tokenAddress
        trace.tokenName = tokenName
        trace.tokenId = tokenId

        // get transfer logs
        trace.TransferLogs = await Token.getTransferLogs(tokenAddress, tokenId)

        // get madeIn log
        // extract address of factory 
        trace.factoryAddress = await Token.getMadeIn(tokenAddress, tokenId)
        
        trace.rawMaterials = await Factory.getRawMaterialLogs(trace.factoryAddress, tokenAddress, tokenId)

        console.log(trace)
        // get raw material logs from factory
        //
    },
    getTokenAddressFromName: async function(tokenName){
        let tokenAddress = ""
        await axios({
            method: 'get',
            url: apiUrl + "/token/getTokenId/" + tokenName
        }).then((res) => {
            if(res.status == 200){
                tokenAddress = res.data.tokenAddress
            }else if(res.status == 404){
                console.error(`Token ${tokenName} not found!`)
                process.exit(1)
            }
        }).catch((err) => {
            console.log(err.response.data)
        })
        return tokenAddress
    },

    isTokenValid: async function(tokenAddress, tokenId){
        let isValid = false

        await axios({
            method: "get",
            url: apiUrl + "/user2token/isvalid/" + tokenAddress + "/" + tokenId.toString() 
        }).then((res) => {
            if(res.status == 200 ){
                if(res.data != 0){
                    isValid = true
                }
            }else{
                console.error("Error in fetching " + apiUrl + "/user2token/isvalid/" + tokenAddress + "/" + tokenId.toString())
                process.exit(1)
            }
        }).catch((err) => {
            console.log(err.response)
        })

        return isValid
    }

}


module.exports = tokenUtil
