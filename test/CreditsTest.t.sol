// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {Credits} from "../src/Credits.sol";
import {Donation} from "../src/Donation.sol";

contract CreditsTest is Test {
    Credits public credit;
    Donation public donation;

    address owner = makeAddr("owner");
    address user1 = makeAddr("user1");

    function setUp() public {
        vm.startPrank(owner);
        credit = new Credits();
        donation = new Donation(address(credit));
        credit.transferOwnership(address(donation));
        vm.stopPrank();
    }

    function test_InitialState() public view {
        assertEq(credit.name(), "Credits");
        assertEq(credit.symbol(), "CRED");
        assertEq(credit.totalSupply(), 0);
        assertEq(credit.MAX_SUPPLY(), 100_000_000 * 10**18);
        assertEq(credit.owner(), address(donation));
    }

    function test_Mint() public {
        uint256 amount = 1000 * 10**18;

        vm.prank(address(donation));
        credit.mint(user1, amount);

        assertEq(credit.balanceOf(user1), amount);
        assertEq(credit.totalSupply(), amount);
    }

    function test_Mint_RevertIf_NotOwner() public {
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        vm.prank(user1);
        credit.mint(user1, 1000 * 10**18);
    }

    function test_Mint_RevertIf_ExceedsMaxSupply() public {
        uint256 maxMint = credit.MAX_SUPPLY();

        vm.prank(address(donation));
        credit.mint(user1, maxMint);

        vm.expectRevert("Max supply exceeded");
        vm.prank(address(donation));
        credit.mint(user1, 1);
    }
}