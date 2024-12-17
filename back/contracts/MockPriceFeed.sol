// contracts/MockPriceFeed.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title MockPriceFeed
 * @notice A mock implementation of Chainlink's Price Feed for testing purposes
 * @dev Implements AggregatorV3Interface with a simplified price feed mechanism
 */
contract MockPriceFeed is AggregatorV3Interface {
   int256 private _price = 105000000;
   uint8 private constant _decimals = 8;

   constructor() {}

   /**
    * @notice Get the number of decimals for the price feed
    * @return The number of decimals (8)
    */
   function decimals() external pure override returns (uint8) {
      return _decimals;
   }

   /**
    * @notice Get the description of the price feed
    * @return A string describing this as a mock EUR/USD price feed
    */
   function description() external pure override returns (string memory) {
      return "Mock EUR/USD Price Feed";
   }

   /**
    * @notice Get the version number of the price feed
    * @return Version number (1)
    */
   function version() external pure override returns (uint256) {
      return 1;
   }

   /**
    * @notice Get data from a specific round
    * @dev This is a mock implementation that returns zeros
    * @param _roundId The round ID to get data for
    * @return roundId The round ID
    * @return answer The price answer
    * @return startedAt When the round started
    * @return updatedAt When the round was updated
    * @return answeredInRound The round in which the answer was computed
    */
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

   /**
    * @notice Get data from the latest round
    * @return roundId The round ID (always 0 in this mock)
    * @return answer The current price
    * @return startedAt Current block timestamp
    * @return updatedAt Current block timestamp
    * @return answeredInRound The round in which the answer was computed (always 0)
    */
   function latestRoundData()
      external
      view
      override
      returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
   {
      return (uint80(0), _price, block.timestamp, block.timestamp, uint80(0));
   }

   /**
    * @notice Update the mock price feed value
    * @dev This function is only for testing purposes
    * @param newPrice The new price to set, with 8 decimals of precision
    */
   function setPrice(int256 newPrice) external {
      _price = newPrice;
   }
}
