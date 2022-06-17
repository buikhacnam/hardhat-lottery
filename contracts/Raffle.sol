//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";

error Raffle__NotEnoughETHEnter();

contract Raffle {
    uint256 private immutable i_entranceFee;
    address payable[] private s_players; //payable here means that the address is a payable address (one of them will win and receive the prize)

    event RaffleEnter(address indexed player);
    
    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEnter();
        }
        s_players.push(payable(msg.sender));
        // emit an event when we update a dynamic array or mapping
        // named events with the function name revert
        emit RaffleEnter(msg.sender);
    }

    function getEntranceFee() public view returns(uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns(address) {
        return s_players[index];
    }
    
}
