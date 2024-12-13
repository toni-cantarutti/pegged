// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev EUROP token contract that can only be minted by the Pegged contract
 * @author @Toni
 */
contract EUROP is ERC20, Ownable {
   /**
    * @dev Constructor for the EUROP contract
    * @dev Sets the owner to the caller of the constructor
    */
   constructor() ERC20("Pegged Stablecoin", "EUROP") Ownable(_msgSender()) {}

   /**
    * @dev Mint tokens to an address (only callable by owner/Pegged contract)
    * @param to The address to mint tokens to
    * @param amount The amount of tokens to mint
    */
   function mint(address to, uint256 amount) external onlyOwner {
      _mint(to, amount);
   }

   /**
    * @dev Burn tokens from an address (only callable by owner/Pegged contract)
    * @param from The address to burn tokens from
    * @param amount The amount of tokens to burn
    */
   function burn(address from, uint256 amount) external onlyOwner {
      _burn(from, amount);
   }
}
