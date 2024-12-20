// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev MockUSDC contract for testing purposes.
 * @author @Toni
 */
contract MockUSDC is ERC20 {
   /**
    * @dev Constructor for the MockUSDC contract.
    * @dev Initializes the contract with 100,000 tokens for the deployer.
    */
   constructor() ERC20("Mock USDC", "USDC") {}

   /**
    * @dev Mint tokens to an address.
    * @param to The address to mint tokens to.
    * @param amount The amount of tokens to mint.
    */
   function mint(address to, uint256 amount) public {
      _mint(to, amount * 10 ** 18);
   }
}
