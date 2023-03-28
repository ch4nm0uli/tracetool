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
    }
}

module.exports = User