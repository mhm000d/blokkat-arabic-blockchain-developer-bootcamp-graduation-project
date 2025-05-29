
// Just for learn how to deploy using scripts



// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
//
//import {Script} from "forge-std/Script.sol";
//import {Credits} from "../src/Credits.sol";
//import {Donation} from "../src/Donation.sol";
//
//contract DeployContracts is Script {
//    function run() external returns (address creditAddress, address donationAddress) {
//
//        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
//        
//        vm.startBroadcast(deployerPrivateKey);
//        
//        // Deploy Credits token first
//        Credits credit = new Credits();
//        
//        // Deploy Donation contract with the Credits address
//        Donation donation = new Donation(address(credit));
//        
//        // Transfer ownership of the Credits contract to the Donation contract
//        // so it can mint tokens when people donate
//        credit.transferOwnership(address(donation));
//        
//        vm.stopBroadcast();
//        
//        // Return the addresses for potential verification or interaction
//        return (address(credit), address(donation));
//    }
//}
