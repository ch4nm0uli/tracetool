//internal imports
const factoryMeta = require('./contract/Factory.json')
const config = require("./const/config.json")

//3pl
const ethers = require('ethers')
const axios = require('axios')

const provider = new ethers.JsonRpcProvider(config.provider)
const apiUrl = config.apiUrl

const Factory = {
    createNewFactory: async function () {
        console.log("Creating new factory...")
        // const privateKey = '0x471762be9adb83d3e08bb81d2cad5f8472f848bb0de0e49345120377f51c6083'
        // const wallet = new ethers.Wallet(privateKey,provider)
        const signer = await provider.getSigner(config.accountIndex)
        const factory = new ethers.ContractFactory(factoryMeta.abi, factoryMeta.bytecode, signer)
        const contract = await factory.deploy()
        const address = await contract.getAddress()
        console.log("New Factory wth address <" + address + "> created")
        return address
    },

    getContractInstance: async function (contractAddress){
        let contract = await new ethers.Contract(contractAddress, factoryMeta.abi, provider)
        return contract
    },
    isAvailable: async function (factoryId) {
        isAvail = false
        await axios({
            method: 'get',
            url: apiUrl + "/factory/isAvail/" + factoryId,
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

module.exports = Factory