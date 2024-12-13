// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./EUROP.sol";

/**
 * @dev Pegged contract that handles 1:1 wrapping of USDC to EUROP
 * @author @Toni
 */
contract Pegged {
   IERC20 public immutable usdc;
   EUROP public immutable europ;

   /**
    * @dev Constructor for the Pegged contract
    * @param usdc_ Address of the MockUSDC contract
    * @param europ_ Address of the EUROP contract
    */
   constructor(address usdc_, address europ_) {
      usdc = IERC20(usdc_);
      europ = EUROP(europ_);
   }

   /**
    * @dev Deposit USDC and mint EUROP 1:1
    * @param amount Amount of USDC to deposit
    */
   function deposit(uint256 amount) external {
      usdc.transferFrom(msg.sender, address(this), amount);
      europ.mint(msg.sender, amount);
   }

   /**
    * @dev Withdraw USDC by burning EUROP 1:1
    * @param amount Amount of EUROP to burn
    */
   function withdraw(uint256 amount) external {
      europ.burn(msg.sender, amount);
      usdc.transfer(msg.sender, amount);
   }
}
