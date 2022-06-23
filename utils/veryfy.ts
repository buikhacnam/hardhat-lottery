import { run } from 'hardhat'

export const verify = async (constractAddress: string, args: any[]) => {
	console.log('verifying contract...')
	//reference: https://hardhat.org/plugins/nomiclabs-hardhat-etherscan
	try {
		await run('verify:verify', {
			address: constractAddress,
			constructorArguments: args,
		})
		// https://rinkeby.etherscan.io/address/0xB4C5EB615693634D826B00c23749Cea5F89b9739#code
	} catch (err:any) {
		if(err.message.toLowerCase().includes('already verified')) {
			console.log('already verified')
		} else {
			console.log(err)
		}
	}
}

