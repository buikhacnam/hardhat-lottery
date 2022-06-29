import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
		rinkeby: {
			url: process.env.RINKEBY_RPC_URL || '',
			accounts:
				process.env.METAMASK_RINKEBY_PRIVATE_KEY !== undefined
					? [process.env.METAMASK_RINKEBY_PRIVATE_KEY]
					: [],
			chainId: 4,
		},
		localhost: {
			url: 'http://127.0.0.1:8545',
			chainId: 31337,
			// accounts: hardhat localhost node will pick up the first account
		}
	},
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: { // 10:19
		//Ids of some network https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/
		deployer: {
			default: 0, // here this will by default take the first account as deployer
			4: 0, // similarly on rinkeby it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
			// 31337: 1
		},

		// you can have multiples deployers, for example:
		player: {
			default: 1,
		}
	},
	mocha: {
		timeout: 100000000
	  },
};

export default config;
