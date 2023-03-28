
//internal imports
const User = require("../internal/user")
const config = require("../internal/const/config.json")

//3pl
const axios = require("axios")

const apiUrl = config.apiUrl

const registerUser = {
    RegisterNewUser: async function (userId) {
        //check if user id already taken
        let isAvail = await User.isAvailable(userId)
        if(!isAvail){
            console.error("Username already taken!"); 
            process.exit(1); 
        }
        let userAddress = await User.getSignerAddress()

        //send the user id and address to the backend
        await axios({
            method: 'post',
            url: apiUrl + '/user/create',
            data: {
                userId: userId,
                userAddress: userAddress
            }
        }).then((res) => {
            if (res.status == 201) {
                console.log(`Created a new user ${userId} successfully.`)
            } else {
                console.error("Failed!")
                console.error(res.data)
            }
        })
    },

    getUserAddressFromId: async function(userId){
        let userAddress = ""
        await axios({
            method: 'get',
            url: apiUrl + "/user/" + userId
        }).then((res) => {
            if(res.status == 200){
                userAddress = res.data.userAddress
                console.log(userAddress)
            }else if(res.status == 404){
                console.error("User not found!")
                process.exit(1)
            }
        })
        return userAddress
    }

}


module.exports = registerUser
