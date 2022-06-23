import { ethers, network } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { developmentChains, networkConfig } from '../helper-hardhat-config'
import { verify } from '../utils/veryfy'
const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	console.log('Start deploying raffle...')
	// hre can be a lot like: import hre from 'hardhat'
	// @ts-ignore
	const { getNamedAccounts, deployments } = hre
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	const chainId: number = network.config.chainId!
	let vrfCoordinatorV2Address: string = ''
	let subscriptionId: string = ''
	if (developmentChains.includes(network.name)) {
		const vrfCoordinatorV2Mock = await ethers.getContract(
			'VRFCoordinatorV2Mock'
		)

		// the same with ???
		// const vrfCoordinatorV2Mock = await deployments.get('VRFCoordinatorV2Mock') 
		// no cause this one is a Deployment not Contract like the first one, so we cannot call createSubscription()

		vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address

		// create subscription for the mock contract
		const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
		const transactionReceipt = await transactionResponse.wait(1)

		// need to have more knowledge about the event
		subscriptionId = transactionReceipt.events[0].args.subId

		// fund the subscription
		await vrfCoordinatorV2Mock.fundSubscription(
			subscriptionId,
			ethers.utils.parseEther('2')
		)
	} else {
		vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
		subscriptionId = networkConfig[chainId].subscriptionId
	}
	const entranceFee = networkConfig[chainId].raffleEntranceFee
	const callbackGasLimit = networkConfig[chainId].callbackGasLimit
	const interval = networkConfig[chainId].keepersUpdateInterval
	const gasLane = networkConfig[chainId].gasLane

	console.log('make it here')
	console.log({
		vrfCoordinatorV2Address,
		entranceFee,
		gasLane,
		subscriptionId,
		callbackGasLimit,
		interval,
	})
	const raffle = await deploy('Raffle', {
		from: deployer,
		args: [
			vrfCoordinatorV2Address,
			entranceFee,
			gasLane,
			subscriptionId,
			callbackGasLimit,
			interval,
		],
		log: true,
		// waitConfirmations: developmentChains.includes(network.name) ? 0 : 1,
	})
	
	if (
		!developmentChains.includes(network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		console.log('start verify contract...')
		/* 
		address vrfCoordinatorV2,
        uint256 entranceFee,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        uint256 interval
		
		*/
		await verify(raffle.address, [
			vrfCoordinatorV2Address,
			entranceFee,
			gasLane,
			subscriptionId,
			callbackGasLimit,
			interval,
		])
		// https://rinkeby.etherscan.io/address/0x06200b1CDE7Ff8CCc0C9608172c8adc0Ea40584e#code
	}

	console.log('raffle deployed at', raffle.address)
}

export default deploy
deploy.tags = ['all', 'raffle']
