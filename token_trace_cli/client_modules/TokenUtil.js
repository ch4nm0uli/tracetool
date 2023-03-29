
//internal imports
// const Token = require("../internal/token")
const config = require("../internal/const/config.json")

//3pl
const axios = require("axios")

const apiUrl = config.apiUrl

const tokenUtil = {
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
