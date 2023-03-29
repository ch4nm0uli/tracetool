//internal imports
const tokenMeta = require('./contract/Token.json')
const config = require("./const/config.json")
const User = require("./user")

//3pl
const ethers = require('ethers')
const axios = require('axios')

const provider = new ethers.JsonRpcProvider(config.provider)
const apiUrl = config.apiUrl

const Token = {
    createNewToken: async function (tkn_name) {
        console.log("Creating new token...")
        const signer = await User.getSigner()
        const token = new ethers.ContractFactory(tokenMeta.abi, tokenMeta.bytecode, signer)
        const contract = await token.deploy(tkn_name)
        const address = await contract.getAddress()
        console.log("New Token wth address <" + address + "> created")
        return address
    },

    getTransferLogs: async function(tokenAddress, tokenId){
        const tokenInstance =  new ethers.Contract(tokenAddress, tokenMeta.abi, provider)
        const eventFragment = tokenInstance.filters.Transfer().fragment

        const  interfc = new ethers.Interface(tokenMeta.abi)
        const topics = interfc.encodeFilterTopics(eventFragment,[Number(tokenId)])

        let filter = {}
        
        filter['fromBlock'] = 0
        filter['toBlock'] = "latest"   
        filter['address'] = ethers.getAddress(tokenAddress)
        filter['topics'] = topics

        const logs = await provider.getLogs(filter)

        const transferLogs = []
        logs.forEach((log) => {
            let parsedLog = interfc.parseLog(log);
            // console.log("---------------start-----------")
            // console.log(log.topics)
            // console.log(a)
            // console.log("---------------end-----------")
            const t = {
                from: parsedLog.args.from,
                to: parsedLog.args.to
            }

            transferLogs.push(t)
        })

        return transferLogs
    },

    getMadeIn: async function(tokenAddress, tokenId){
        
        const tokenInstance =  new ethers.Contract(tokenAddress, tokenMeta.abi, provider)
        const eventFragment = tokenInstance.filters.MadeIn().fragment

        const  interfc = new ethers.Interface(tokenMeta.abi)
        const topics = interfc.encodeFilterTopics(eventFragment,[Number(tokenId)])

        let filter = {}
        
        filter['fromBlock'] = 0
        filter['toBlock'] = "latest"   
        filter['address'] = ethers.getAddress(tokenAddress)
        filter['topics'] = topics  
        
        const logs = await provider.getLogs(filter)

        if(logs.length <= 0){
            console.error("Error: No factory log found!")
            process.exit(1)
        }
        let parsedLog = interfc.parseLog(logs[0])

        return parsedLog.args.factoryAddress
    }, 

    getContractInstance: async function (contractAddress){
        const signer = await User.getSigner()
        let contract = await new ethers.Contract(contractAddress, tokenMeta.abi, signer )
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