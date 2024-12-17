// contracts/MockPriceFeed.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MockPriceFeed is AggregatorV3Interface {
   int256 private _price = 105000000;
   uint8 private constant _decimals = 8;

   constructor() {}

   function decimals() external pure override returns (uint8) {
      return _decimals;
   }

   function description() external pure override returns (string memory) {
      return "Mock EUR/USD Price Feed";
   }

   function version() external pure override returns (uint256) {
      return 1;
   }

   function getRoundData(
      uint80 _roundId
   )
      external
      pure
      override
      returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
   {
      return (_roundId, 0, 0, 0, 0);
   }

   function latestRoundData()
      external
      view
      override
      returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
   {
      return (uint80(0), _price, block.timestamp, block.timestamp, uint80(0));
   }

   // Function to update price (only for testing)
   function setPrice(int256 newPrice) external {
      _price = newPrice;
   }
}
