import { loadFixture, impersonateAccount, setBalance } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { deployFixture } from "./deployFixture";

describe("MockPriceFeed", function () {
   it("Check initial price", async function () {
      const { MockPriceFeed } = await loadFixture(deployFixture);
      const [, price] = await MockPriceFeed.latestRoundData();
      expect(price).to.equal(105000000);
   });

   it("Check setPrice method", async function () {
      const { MockPriceFeed } = await loadFixture(deployFixture);
      await MockPriceFeed.setPrice(106000000);
      const [, price] = await MockPriceFeed.latestRoundData();
      expect(price).to.equal(106000000);
   });

   it("Should return correct decimals", async function () {
      const { MockPriceFeed } = await loadFixture(deployFixture);
      expect(await MockPriceFeed.decimals()).to.equal(8);
   });

   it("Should return correct description", async function () {
      const { MockPriceFeed } = await loadFixture(deployFixture);
      expect(await MockPriceFeed.description()).to.equal("Mock EUR/USD Price Feed");
   });

   it("Should return correct version", async function () {
      const { MockPriceFeed } = await loadFixture(deployFixture);
      expect(await MockPriceFeed.version()).to.equal(1);
   });

   it("Should return zeros for getRoundData", async function () {
      const { MockPriceFeed } = await loadFixture(deployFixture);
      const [roundId, answer, startedAt, updatedAt, answeredInRound] = await MockPriceFeed.getRoundData(1);
      expect(roundId).to.equal(1);
      expect(answer).to.equal(0);
      expect(startedAt).to.equal(0);
      expect(updatedAt).to.equal(0);
      expect(answeredInRound).to.equal(0);
   });
});
