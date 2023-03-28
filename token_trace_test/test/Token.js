const {ethers} = require("hardhat")
const {expect} = require("chai");
const { utils } = require("ethers");
const { keccak256 } = require("ethers/lib/utils");

const filePath = 'F:/blkchain/metaschool/token_trace_test/artifacts/contracts/Token.sol/Token.json'
const data = require(filePath)

describe("ItemOwnable", async()=>{

    let accounts, itemOwnable, deployer, manufacturer, distributer1, distributer2, consumer,contractA,fil,contractAddress,contractAbi;
    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        manufacturer = deployer

        distributer1 = accounts[1]
        distributer2 = accounts[2]
        consumer = accounts[3]

        const ItemOwnable = await ethers.getContractFactory("Token");
        itemOwnableA = await ItemOwnable.connect(manufacturer).deploy("A");
        itemOwnableB = await ItemOwnable.connect(manufacturer).deploy("B");
        itemOwnableC = await ItemOwnable.connect(manufacturer).deploy("C");

        contractAddress = itemOwnableA.address
        contractAbi = JSON.stringify(data['abi'])
        contractA = new ethers.Contract(contractAddress, contractAbi, ethers.provider);

        fil =  contractA.filters.Transfer()
        // console.log(fil)
       
        //await itemOwnable.wait()
    })

    it("Deployment", async()=>{
        console.log("Deployer: " + deployer.address)
        console.log("Manufacturer: " + manufacturer.address)
        console.log("distributer1: " + distributer1.address)
        console.log("distributer2: " + distributer2.address)
        console.log("consumer: " + consumer.address)
        expect(await itemOwnableA.Name()).to.equal("A")
        expect(await itemOwnableB.Name()).to.equal("B")
        expect(await itemOwnableC.Name()).to.equal("C")

    })

    it("Logs", async()=>{
        contractA.on(fil, (a,b,c) => {
            console.log("Transfer event\n")
        })
       
        await itemOwnableA.connect(manufacturer).Mint(1)
        await itemOwnableA.connect(manufacturer).Mint(2)
        await itemOwnableA.connect(manufacturer).Mint(3)

        await itemOwnableA.connect(manufacturer).TransferTo(1, distributer1.address)
        await itemOwnableA.connect(manufacturer).TransferTo(2, distributer2.address)

        await itemOwnableA.connect(distributer1).TransferTo(1, distributer2.address)
        await itemOwnableA.connect(distributer2).TransferTo(1, consumer.address)
        await itemOwnableA.connect(distributer2).TransferTo(2, consumer.address)

        await new Promise(res => setTimeout(() => res(null), 6000));

    
        contractA = new ethers.Contract(contractAddress, contractAbi, ethers.provider);

        //Generating filter
        filter  = contractA.filters.Transfer(1)
        filter['fromBlock'] = 0
        filter['toBlock'] = "latest"

        const logs = await ethers.provider.getLogs(filter);

        //Parsing raw logs
        const intrfc = new ethers.utils.Interface(contractAbi);
        logs.forEach((log) => {
            // console.log(`BEFORE PARSING:`);
            // console.debug(log);
            // console.log(`\n`);
    
            // console.log(`AFTER PARSING:`);
            let parsedLog = intrfc.parseLog(log);
            // console.log("Tokenid: ",parsedLog['args']['TokenId'])
            // console.log("From: ",parsedLog['args']['from'])
            // console.log("To: ",parsedLog['args']['to'])
            // console.log("\n")
            // console.debug(parsedLog);
            // console.log('************************************************');
        })


    })
    

})