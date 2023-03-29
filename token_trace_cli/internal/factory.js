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

    getRawMaterialLogs: async function(factoryAddress, tokenAddress, tokenId){
        const factoryInstance = await Factory.getContractInstance(factoryAddress)
        const eventFragment = factoryInstance.filters.RawMaterial().fragment

        const  interfc = new ethers.Interface(factoryMeta.abi)
        const topics = interfc.encodeFilterTopics(eventFragment,[tokenAddress,Number(tokenId)])

        let filter = {}
        
        filter['fromBlock'] = 0
        filter['toBlock'] = "latest"   
        filter['address'] = ethers.getAddress(factoryAddress)
        filter['topics'] = topics   
        
        const logs = await provider.getLogs(filter)

        const rawMaterials = []
        logs.forEach((log) => {
            let parsedLog = interfc.parseLog(log);
            const t = {
                id: Number(parsedLog.args.rawTknId),
                address:parsedLog.args.rawAddr,
            }

            rawMaterials.push(t)
        })

        return rawMaterials
    },

    getContractInstance: async function (contractAddress){
        const signer = await provider.getSigner(config.accountIndex)
        let contract = await new ethers.Contract(contractAddress, factoryMeta.abi, signer)
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