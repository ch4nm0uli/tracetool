//internal imports
const tokenMeta = require('./contract/Token.json')
const config = require("./const/config.json")

//3pl
const ethers = require('ethers')
const axios = require('axios')

const provider = new ethers.JsonRpcProvider(config.provider)
const apiUrl = config.apiUrl

const Token = {
    createNewToken: async function (tkn_name) {
        console.log("Creating new token...")
        const signer = await provider.getSigner(config.accountIndex)
        const token = new ethers.ContractFactory(tokenMeta.abi, tokenMeta.bytecode, signer)
        const contract = await token.deploy(tkn_name)
        const address = await contract.getAddress()
        console.log("New Token wth address <" + address + "> created")
        return address
    },

    getContractInstance: async function (contractAddress){
        let contract = await new ethers.Contract(contractAddress, factoryMeta.abi, provider)
        return contract
    },
    isAvailable: async function (tokenName) {
        isAvail = false
        await axios({
            method: 'get',
            url: apiUrl + "/token/isAvail/" + tokenName,
        }).then((res) => {
            if (res.status == 200) {
                if (Number(res.data) == 0) {
                    isAvail = true
                } else {
                    isAvail = false
                }
            } else {
                console.error("Server error!")
                process.exit(1)
            }
        })
        return isAvail
    }
}

module.exports = Token