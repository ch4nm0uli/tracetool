const axios = require("axios")
const config = require("./internal/const/config.json")

const apiUrl = config.apiUrl


axios({
    method: "delete",
    url: apiUrl + "/factory/all"
}).catch((err) => {
    console.error(err.response.status)
})

axios({
    method: "delete",
    url: apiUrl + "/user/all"
}).catch((err) => {
    console.error(err.response.status)
})

axios({
    method: "delete",
    url: apiUrl + "/token/all"
}).catch((err) => {
    console.error(err.response.status)
})

axios({
    method: "delete",
    url: apiUrl + "/user2token/all"
}).catch((err) => {
    console.error(err.response.status)
})
