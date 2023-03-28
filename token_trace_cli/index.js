#!/usr/bin/env node

//internal imports
const config = require("./internal/const/config.json")
const { RegisterNewFactory, getOwner, inventNewToken, singleMint, multiMint} = require("./client_modules/FactoryUtil")
const {RegisterNewUser} = require("./client_modules/UserUtil")
const User = require("./internal/user")
const utils = require("./internal/utils")
const {showhelp} = require("./internal/help")

//3pl
const yargs = require("yargs")
const { argv } = yargs(process.argv)

console.log("Client started...")

async function main() {
    let isReg = await User.isRegistered()
    console.log("IsReg ", isReg)
    if(!isReg && argv._[2] != "user" && argv._[3] != "register"){
        console.error(`User is not registered! 
        use command: trace_cli user register --userId=<user_id>
        `)
        process.exit(1)
    }
    switch (argv._[2]) {
        case "factory":
            if (argv.factoryId == undefined) { console.error("No factory Id provided!"); process.exit(1); }
            //validate if the token id and the address of the signer are equal
            switch (argv._[3]) {
                case "register":
                    await RegisterNewFactory(argv.factoryId)
                    break;

                case "get_owner":
                    console.log("owner: ", await getOwner(argv.factoryId))
                    break;
                
                case "create_token":
                    if (argv.tokenName == undefined) { console.error("No Token name provided!"); process.exit(1); }
                    await inventNewToken(argv.tokenName, argv.factoryId)
                    break;

                default:
                    showhelp()
                    break;
            }
            break;
        
        case "user":
            switch (argv._[3]) {
                case "register":
                    if (argv.userId == undefined) { console.error("No user Id provided!"); process.exit(1); }
                    await RegisterNewUser(argv.userId)
                    break;

                default:
                    showhelp()
                    break;
            }
            break;
        case "mint":
            if (argv.userId == undefined) { console.error("No user Id provided!"); process.exit(1); }
            if (argv.tokenName == undefined) { console.error("No token name provided!"); process.exit(1); }
            if (argv.factoryId == undefined) { console.error("No factory Id provided!"); process.exit(1); }
            switch (argv._[3]) {
                case "single":
                    await singleMint(argv.userId, argv.tokenName, argv.factoryId)
                    break;
                case "multi":
                    if (argv.rNames == undefined) { console.error("No ram material names provided!"); process.exit(1); }
                    if (argv.rIds == undefined) { console.error("No ram material ID's provided!"); process.exit(1); }
                    let rNames = utils.arrayParser(argv.rNames)
                    let rIds = utils.arrayParserInt(argv.rIds)
                    
                    await multiMint(argv.userId, argv.tokenName, argv.factoryId, rNames, rIds)
                    break
                default:
                    showhelp()
                    break;
            }
            break;
        default:
            showhelp()
            break;
    }
}

main()

// console.log(argv)