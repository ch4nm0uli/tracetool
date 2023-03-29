//internal imports
const config = require("./const/config.json")

//3pl
const ethers = require('ethers')
const axios = require('axios')

const provider = new ethers.JsonRpcProvider(config.provider)
const apiUrl = config.apiUrl

const User = {

    isRegistered: async function(){
        let isAvail = true
        let userAddress = await this.getSignerAddress()

        await axios({
            method: "get",
            url: apiUrl + '/user/isAddrAvail/' + userAddress
        }).then((res) => {
            if (res.status == 200) {
                if (Number(res.data) == 0) {
                    isAvail = false
                } else {
                    isAvail = true
                }
            } else {
                console.error("Server error!")
                process.exit(1)
            }
        })
        return isAvail
    },

    //true when no user name userId is found
    isAvailable: async function (userId) {
        isAvail = false
        await axios({
            method: 'get',
            url: apiUrl + "/user/isAvail/" + userId,
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
    },

    getSignerAddress: async function(){
        const signer = await provider.getSigner(config.accountIndex)
        return signer.address
    },
    getSigner: async function(){
        const signer = await provider.getSigner(config.accountIndex)
        return signer
    },


    getUserAddressFromId: async function(userId) {
        let userAddress = ""
        if(await this.isAvailable(userId)){
            console.error(`Error: user ${userId} is not registered!`)
            process.exit(1)
        }

        await axios({
            method: "get",
            url: apiUrl + "/user/" + userId
        }).then((res) => {
            if(res.status == 200){
                userAddress = res.data.userAddress
            }else{
                console.error("Error in fetching "  + apiUrl + "/" + userId)
                process.exit(1)
            }
        })

        return userAddress

    }
}

module.exports = User