const {ethers} = require("hardhat")
const {expect} = require("chai");
const { utils } = require("ethers");
const { keccak256 } = require("ethers/lib/utils");

const tokenFilePath = 'F:/blkchain/metaschool/token_trace_test/artifacts/contracts/Token.sol/Token.json'
const factoryFilePath = 'F:/blkchain/metaschool/token_trace_test/artifacts/contracts/Factory.sol/Factory.json'

const tokendata = require(tokenFilePath)
const factorydata = require(factoryFilePath)

describe("ItemOwnable", async()=>{
    let accounts, rawSupp,manufacturer2, deployer, manufacturer, distributer1, distributer2, consumer,contractA,fil,contractAddress,contractAbi;
    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        manufacturer = deployer
        manufacturer2 = accounts[4]
        rawSupp = accounts[5]

        distributer1 = accounts[1]
        distributer2 = accounts[2]
        consumer = accounts[3]

        const Token = await ethers.getContractFactory("Token");
        const Factory = await ethers.getContractFactory("Factory")
        Factory1 = await Factory.connect(manufacturer).deploy();
        Factory2 = await Factory.connect(manufacturer2).deploy()
        TokenA = await Token.connect(manufacturer).deploy("A");
        TokenB = await Token.connect(manufacturer).deploy("B");
        TokenC = await Token.connect(manufacturer).deploy("C");

        TokenD = await Token.connect(manufacturer).deploy("D");
        TokenE = await Token.connect(manufacturer2).deploy("E");

        tokenAbi = JSON.stringify(tokendata['abi'])
        factoryAbi = JSON.stringify(factorydata['abi'])
        contractAddress = TokenA.address

        TknConA = new ethers.Contract(TokenA.address, tokenAbi, ethers.provider);
        TknConB = new ethers.Contract(TokenB.address, tokenAbi, ethers.provider);
        TknConC = new ethers.Contract(TokenC.address, tokenAbi, ethers.provider);
        TknConD = new ethers.Contract(TokenD.address, tokenAbi, ethers.provider);
        TknConE = new ethers.Contract(TokenE.address, tokenAbi, ethers.provider);

        FactCon1 = new ethers.Contract(Factory1.address, factoryAbi, ethers.provider);
        FactCon2 = new ethers.Contract(Factory2.address, factoryAbi, ethers.provider);
        // fil =  contractA.filters.Transfer()
        // console.log(fil)
       
        //await itemOwnable.wait()
    })

    it("Deployment", async()=>{
        console.log("Deployer: " + deployer.address)
        console.log("Manufacturer: " + manufacturer2.address)
        console.log("distributer1: " + distributer1.address)
        console.log("distributer2: " + distributer2.address)
        console.log("consumer: " + consumer.address)

    })

    it("Multi mint", async()=>{
        await TokenA.connect(rawSupp).Mint(1)
        await TokenA.connect(rawSupp).Mint(2)

        await TokenB.connect(rawSupp).Mint(1)
        await TokenB.connect(rawSupp).Mint(2)

        await TokenC.connect(rawSupp).Mint(1)
        await TokenC.connect(rawSupp).Mint(2)

        await TokenA.connect(rawSupp).TransferTo(1, manufacturer.address)
        await TokenB.connect(rawSupp).TransferTo(1, manufacturer.address)
        await TokenC.connect(rawSupp).TransferTo(1, manufacturer.address)

        await TokenA.connect(rawSupp).TransferTo(2, manufacturer2.address)
        await TokenB.connect(rawSupp).TransferTo(2, manufacturer2.address)

        await Factory1.connect(manufacturer).MultiMint(3,[TokenA.address, TokenB.address, TokenC.address], [1,1,1], TokenD.address, 1);

        await TokenD.connect(manufacturer).TransferTo(1, manufacturer2.address)

        await Factory2.connect(manufacturer2).MultiMint(3, [TokenA.address, TokenB.address, TokenD.address], [2,2,1], TokenE.address, 1);

        //(tokenE,1) is the root
        //Generating filter
        console.log("-----------Transfer logs-------------")
        filter  = TokenE.filters.Transfer(1)
        filter['fromBlock'] = 0
        filter['toBlock'] = "latest"

        logs = await ethers.provider.getLogs(filter);

        //Parsing raw logs
        intrfc = new ethers.utils.Interface(tokenAbi);
        logs.forEach((log) => {
            let parsedLog = intrfc.parseLog(log);
            console.log(parsedLog.name)
            console.log(parsedLog.args)
        })

        console.log("-----------Factory Address-------------")
        filter  = TokenE.filters.MadeIn(1)
        filter['fromBlock'] = 0
        filter['toBlock'] = "latest"

        logs = await ethers.provider.getLogs(filter);

        //Parsing raw logs
        intrfc = new ethers.utils.Interface(tokenAbi);
        logs.forEach((log) => {
            let parsedLog = intrfc.parseLog(log);
            console.log(parsedLog.name)
            console.log(parsedLog.args)
        })
        console.log("-----------Raw Materials logs-------------")
        filter  = Factory2.filters.RawMaterial(TokenE.address, 1)
        filter['fromBlock'] = 0
        filter['toBlock'] = "latest"

        logs = await ethers.provider.getLogs(filter);

        //Parsing raw logs
        intrfc = new ethers.utils.Interface(factoryAbi);
        logs.forEach((log) => {
            let parsedLog = intrfc.parseLog(log);
            console.log(parsedLog.name)
            console.log(parsedLog.args)
        })
    })

  
    

})