
const helpText = `

trace_cli <command>

usage:

trace_cli factory register --factoryId=<id>                                 register a new factory
trace_cli factory get_owner --factoryId=<id>                                get the owner of the factory
trace_cli factory create_token --factoryId=<id> --tokenName=<name>          create a new token kind
trace_cli user register --userId=<userId>                                   register a new user
trace_cli mint single --userId=<uid> --tokenName=<name> --factoryId=<id>    mint a single product with no raw material
trace_cli mint multi --userId=<uid> --tokenName=<name> --factoryId=<id>
            --rNames=[name1,name2,...nameN] --rIds=[id1,id2,...idN]         mint a new product taking N rawmaterials 
trace_cli transfer --toUser=<userId> --tokenName=<name> --tokenId=<id>      transfer token 

`

const help = {
    showhelp: function(){
        console.log(helpText)
    }
}

module.exports = help