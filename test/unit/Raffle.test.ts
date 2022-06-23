import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, expect } from 'chai'
import { BigNumber } from 'ethers'
import { network, deployments, ethers } from 'hardhat'
import { developmentChains, networkConfig } from '../../helper-hardhat-config'
import { Raffle, VRFCoordinatorV2Mock } from '../../typechain'

!developmentChains.includes(network.name)
	? describe.skip
	: describe('Raffle', () => {
			let raffle: Raffle
			let raffleContract: Raffle
			let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
			let raffleEntranceFee: BigNumber
			let interval: number
			let player: SignerWithAddress
			let accounts: SignerWithAddress[]
			beforeEach(async () => {
				accounts = await ethers.getSigners() // could also do with getNamedAccounts
                console.log(`accounts: ${accounts.map(a => a.address + ' | ')}`)
				//   deployer = accounts[0]
				player = accounts[1]
                console.log(`player: ${player.address}`)
				await deployments.fixture(['mocks', 'raffle'])
				vrfCoordinatorV2Mock = await ethers.getContract(
					'VRFCoordinatorV2Mock'
				)
				raffleContract = await ethers.getContract('Raffle')
				raffle = raffleContract.connect(player)
				raffleEntranceFee = await raffle.getEntranceFee()
                console.log(`raffleEntranceFee: ${raffleEntranceFee}`)
				interval = (await raffle.getInterval()).toNumber()
                console.log(`interval: ${interval}`)
			})

			describe('constructor', function () {
				it('intitiallizes the raffle correctly', async () => {
					// Ideally, we'd separate these out so that only 1 assert per "it" block
					// And ideally, we'd make this check everything
					const raffleState = (
						await raffle.getRaffleState()
					).toString()
					assert.equal(raffleState, '0')
					assert.equal(
						interval.toString(),
						networkConfig[network.config.chainId!][
							'keepersUpdateInterval'
						]
					)
				})
			})
	  })
