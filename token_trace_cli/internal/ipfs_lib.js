const axios = require("axios")
const fs = require("fs")
const FormData = require("form-data")
const config = require("./const/config.json")
const stream = require("stream")
const ipfs_lib = {

    AddData: async function (data) {
        if(typeof(data) != typeof("")){
            console.error("Error only string data is supported in ipfs_lib.AddData()!")
            process.exit(1)
        }
        const form_data = new FormData();
        const readStream = new stream.Readable.from(data, { encoding: "utf-8" })
        form_data.append("file", readStream);

        try {
            var res =  await axios({
                url: config.ipfs.RPC_SERVER + "/add",
                method: "post",
                headers: {
                    ...form_data.getHeaders()
                },
                data: form_data
            })          
        } catch (error) {
            console.error("Error occured in axios call processing IPFS add!")
            process.exit(1)
        }

        if(res.status == 200){
            return res.data.Hash
        }else{
            console.error("Error occured while processing IPFS add call!")
            process.exit(1)
        }
    },

    GetData: async function(cid) {
        try {
            var res = await axios({
                url: config.ipfs.HTTP_SERVER+ cid,
                method: "get"
            })
        } catch (error) {
            console.error("Error occured while getting data from IPFS!")
            process.exit(1)
        }
        return res.data
    }
}

module.exports = ipfs_lib