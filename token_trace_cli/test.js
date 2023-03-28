const Factory = require("./client_modules/registerFactory")

async function main() {
    let con = await Factory.getOwner("factory_1")
    console.log(con)
}
main()