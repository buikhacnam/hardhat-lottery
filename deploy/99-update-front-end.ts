import fs from "fs"
import {DeployFunction} from "hardhat-deploy/types"
import {HardhatRuntimeEnvironment} from "hardhat/types"

const updateUI: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
  ) {
    const { ethers, network: {config: {chainId}} } = hre
    // const chainId = "31337"
    
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        const raffle = await ethers.getContract("Raffle")


        // WRITE ADDRESS
        const contractAddresses = JSON.parse(fs.readFileSync("./constants/contractAddresses.json", "utf8"))
        if (chainId! in contractAddresses) {
            if (!contractAddresses[chainId!].includes(raffle.address)) {
                contractAddresses[chainId!].push(raffle.address)
            }
        } else {
            contractAddresses[chainId!] = [raffle.address]
        }
        fs.writeFileSync("./constants/contractAddresses.json", JSON.stringify(contractAddresses))


        // WRITE ABI
        fs.writeFileSync("./constants/abi.json", raffle.interface.format(ethers.utils.FormatTypes.json))


        console.log("Front end written!")
    }
}
export default updateUI
updateUI.tags = ["all", "frontend"]