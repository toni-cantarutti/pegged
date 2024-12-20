// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "./EUROP.sol";

/**
 * @dev Pegged contract that handles 1:1 wrapping of USDC to EUROP
 * @author @Toni
 */
contract Pegged {
   IERC20 public immutable usdc;
   EUROP public immutable europ;
   AggregatorV3Interface public immutable priceFeed;

   // Add fee constant
   uint256 public constant FEE_BPS = 10;

   // Balances
   uint256 public collateralBalance;
   uint256 public feeBalance;
   uint256 public revenueBalance;

   // New event for tracking USDC amounts and exchange rates
   event TokensMinted(uint256 usdcAmount, uint256 europAmount, int256 exchangeRate, uint256 timestamp);
   event TokensBurned(uint256 usdcAmount, uint256 europAmount, int256 exchangeRate, uint256 timestamp);
   event FeesCollected(uint256 depositFee, uint256 timestamp);

   // Errors
   error InvalidPriceFeed();

   /**
    * @dev Constructor for the Pegged contract
    * @param usdc_ Address of the MockUSDC contract
    * @param europ_ Address of the EUROP contract
    * @param priceFeed_ Address of the EUR/USD price feed
    */
   constructor(address usdc_, address europ_, address priceFeed_) {
      usdc = IERC20(usdc_);
      europ = EUROP(europ_);
      priceFeed = AggregatorV3Interface(priceFeed_);
   }

   /**
    * @dev Deposit USDC and mint EUROP based on current EUR/USD rate
    * @param usdcAmount Amount of USDC to deposit
    */
   function deposit(uint256 usdcAmount) external {
      // Get current EUR/USD price
      (, int256 price, , , ) = priceFeed.latestRoundData();
      if (price <= 0) revert InvalidPriceFeed();

      // Calculate EUROP amount to mint (USDC amount * EUR/USD rate)
      // Both USDC and EUROP have 18 decimals, only need to adjust for price feed decimals
      uint256 europAmount = (usdcAmount * 10 ** priceFeed.decimals()) / uint256(price);

      // Calculate fee
      uint256 fee = (europAmount * FEE_BPS) / 10000;
      uint256 mintAmount = europAmount - fee;

      // Transfer USDC from user
      usdc.transferFrom(msg.sender, address(this), usdcAmount);

      // Mint EUROP tokens minus fee
      europ.mint(msg.sender, mintAmount);

      feeBalance += fee;
      emit FeesCollected(fee, block.timestamp);
      emit TokensMinted(usdcAmount, mintAmount, price, block.timestamp);
   }

   /**
    * @dev Withdraw USDC by burning EUROP based on current EUR/USD rate
    * @param europAmount Amount of EUROP to burn
    */
   function withdraw(uint256 europAmount) external {
      // Get current EUR/USD price
      (, int256 price, , , ) = priceFeed.latestRoundData();
      if (price <= 0) revert InvalidPriceFeed();

      // Calculate USDC amount to return (EUROP amount / EUR/USD rate)
      uint256 usdcAmount = (europAmount * uint256(price)) / 1e8;

      // Calculate fee
      uint256 fee = (usdcAmount * FEE_BPS) / 10000;
      uint256 transferAmount = usdcAmount - fee;

      // Burn EUROP from user
      europ.burn(msg.sender, europAmount);

      // Transfer USDC minus fee
      usdc.transfer(msg.sender, transferAmount);

      feeBalance += fee;
      emit FeesCollected(fee, block.timestamp);
      emit TokensBurned(transferAmount, europAmount, price, block.timestamp);
   }
}
