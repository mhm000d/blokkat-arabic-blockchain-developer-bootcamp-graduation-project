// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Credits is ERC20, Ownable {

    // To limit endless minting
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18; // 100 million CRED

    constructor() ERC20("Credits", "CRED") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }

}