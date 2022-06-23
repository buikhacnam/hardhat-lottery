export const networkConfig:any = {
    4: {
        name: 'rinkeby',
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e", // https://docs.chain.link/docs/ethereum-addresses/
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab", // https://docs.chain.link/docs/vrf-contracts/#rinkeby-testnet
        subscriptionId: "6712", // https://vrf.chain.link/rinkeby/6712
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    137: {
        name: 'polygon',
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945" //https://docs.chain.link/docs/matic-addresses/
    },
    31337: {
        name: "hardhat",
        subscriptionId: "6712",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 5
    }
}

export const developmentChains = ["hardhat", "localhost"]

