// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Credits} from "./Credits.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Donation is Ownable {
    Credits public credit;

    // Tracks which user has voted for which case
    mapping(address => mapping(string => bool)) private _hasVotedForCase;

    struct DonationRecord {
        address donor;
        string theCase;
        string message;
        uint256 amount;
    }

    DonationRecord[] public donations;
    uint256 public constant CREDITS_PER_ETH = 100; // 1 ETH = 100 CRED

    event Voted(address indexed donor, string indexed theCase, uint256 amount);

    constructor(address creditAddress) Ownable(msg.sender) {
        credit = Credits(creditAddress);

        // Take control of Credits minting
        // by transfer the ownership (manually) to Donation.sol contract.
    }

    // Users vote by donating ETH to a case
    function vote(string calldata theCase, string calldata message) external payable {
        require(msg.value > 0, "Donation required");
        require(!_hasVotedForCase[msg.sender][theCase], "Already voted for this case");

        _hasVotedForCase[msg.sender][theCase] = true;

        donations.push(DonationRecord(
            msg.sender,
            theCase,
            message,
            msg.value
        ));

        // Mint credits: 1 ETH = 100 CRED
        credit.mint(msg.sender, msg.value * CREDITS_PER_ETH);

        emit Voted(msg.sender, theCase, msg.value);
    }

    // Solve the case-sensitivity issue
    function _toKey(string calldata _case) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_case));
    }

    // Owner can withdraw donated ETH
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Return all donations in once
    function showDonors() public view returns (DonationRecord[] memory) {
        return donations;
    }

    // Returns total amount of votes
    function votedCount() public view returns (uint256) {
        return donations.length;
    }

    // Check specific case
    function hasVotedFor(address user, string calldata _theCase) public view returns (bool) {
        return _hasVotedForCase[user][_theCase];
    }

    // Return contract balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}