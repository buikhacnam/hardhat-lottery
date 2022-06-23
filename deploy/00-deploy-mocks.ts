import { network, ethers} from 'hardhat'
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {developmentChains } from '../helper-hardhat-config'

const BASE_FEE = ethers.utils.parseEther('0.25') // 0.25 is the premium. It costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain (link per gas)

const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    // @ts-ignore
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if(developmentChains.includes(network.name)) {
        log('Deploying mocks nha...')
        console.log('mock deployer:', deployer)
        const mock = await deploy('VRFCoordinatorV2Mock', {
            contract: 'VRFCoordinatorV2Mock',
            from: deployer,
            args: [BASE_FEE, GAS_PRICE_LINK],
            log: true,
        })
        log('Mocks deployed!')
        console.log('mock address: ', mock.address)
        log('--------------------------------------------------')
    }
}

export default deploy
deploy.tags = ["all", "mocks"]
//when we run: yarn hardhat deploy --tags mocks
//it will only run this file (has mocks tag)