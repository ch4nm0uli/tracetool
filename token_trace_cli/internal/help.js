
const helpText = `

trace_cli <command>

usage:

trace_cli factory register --factoryId=<id>     register a new factory
trace_cli factory get_owner --factoryId=<id>    get the owner of the factory
trace_cli user register --userId=<userId>       register a new user

`

const help = {
    showhelp: function(){
        console.log(helpText)
    }
}

module.exports = help