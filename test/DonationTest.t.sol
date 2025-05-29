// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {Credits} from "../src/Credits.sol";
import {Donation} from "../src/Donation.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // To access the custom error selector

contract DonationTest is Test {
    Credits public credit;
    Donation public donation;

    address owner = makeAddr("owner");
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");

    string constant TEST_CASE = "Test Case";
    string constant TEST_MESSAGE = "Test Message";

    function setUp() public {
        vm.startPrank(owner);
        credit = new Credits();
        donation = new Donation(address(credit));
        credit.transferOwnership(address(donation));
        vm.stopPrank();
    }

    function test_InitialState() public view {
        assertEq(donation.owner(), owner);
        assertEq(address(donation.credit()), address(credit));
        assertEq(donation.CREDITS_PER_ETH(), 100);
        assertEq(donation.votedCount(), 0);
    }

    function test_Vote() public {
        uint256 donationAmount = 1 ether;

        vm.deal(user1, donationAmount);
        vm.prank(user1);
        donation.vote{value: donationAmount}(TEST_CASE, TEST_MESSAGE);

        (address donor, string memory theCase, string memory message, uint256 amount) = donation.donations(0);
        assertEq(donor, user1);
        assertEq(theCase, TEST_CASE);
        assertEq(message, TEST_MESSAGE);
        assertEq(amount, donationAmount);

        assertEq(credit.balanceOf(user1), donationAmount * donation.CREDITS_PER_ETH());
        assertTrue(donation.hasVotedFor(user1, TEST_CASE));
        assertEq(donation.votedCount(), 1);
        assertEq(donation.getBalance(), donationAmount);
    }

    function test_Vote_RevertIf_ZeroValue() public {
        vm.expectRevert("Donation required");
        donation.vote(TEST_CASE, TEST_MESSAGE);
    }

    function test_Vote_RevertIf_DuplicateVote() public {
        uint256 donationAmount = 1 ether;
        vm.deal(user1, donationAmount * 2);

        vm.prank(user1);
        donation.vote{value: donationAmount}(TEST_CASE, TEST_MESSAGE);

        vm.expectRevert("Already voted for this case");
        vm.prank(user1);
        donation.vote{value: donationAmount}(TEST_CASE, "Different message");
    }

    function test_ShowDonors() public {
        uint256 donationAmount = 1 ether;
        vm.deal(user1, donationAmount);
        vm.deal(user2, donationAmount);

        vm.prank(user1);
        donation.vote{value: donationAmount}("Case 1", "Message 1");

        vm.prank(user2);
        donation.vote{value: donationAmount}("Case 2", "Message 2");

        Donation.DonationRecord[] memory records = donation.showDonors();

        assertEq(records.length, 2);
        assertEq(records[0].donor, user1);
        assertEq(records[0].theCase, "Case 1");
        assertEq(records[1].donor, user2);
        assertEq(records[1].theCase, "Case 2");
    }

    function test_Withdraw() public {
        uint256 donationAmount = 1 ether;
        vm.deal(user1, donationAmount);

        vm.prank(user1);
        donation.vote{value: donationAmount}(TEST_CASE, TEST_MESSAGE);

        uint256 initialOwnerBalance = owner.balance;
        uint256 contractBalance = donation.getBalance();

        vm.prank(owner);
        donation.withdraw();

        assertEq(owner.balance, initialOwnerBalance + contractBalance);
        assertEq(donation.getBalance(), 0);
    }

    function test_Withdraw_RevertIf_NotOwner() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user1));
        donation.withdraw();
    }
    
}