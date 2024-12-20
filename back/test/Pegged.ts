; import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { deployFixture } from "./deployFixture";

describe("Pegged", function () {
   it("Check Deployment", async function () {
      const { Pegged, MockUSDC, EUROP, MockPriceFeed } = await loadFixture(deployFixture);
      expect(await Pegged.usdc()).to.equal(MockUSDC.target);
      expect(await Pegged.europ()).to.equal(EUROP.target);
      expect(await Pegged.priceFeed()).to.equal(MockPriceFeed.target);
      expect(await MockUSDC.balanceOf(Pegged.target)).to.equal(BigInt(100000) * BigInt(10 ** 18));
   });

   it("Should deposit USDC and mint EUROP with fees and conversion rate", async function () {
      const { Pegged, MockUSDC, EUROP, MockPriceFeed, addr0 } = await loadFixture(deployFixture);

      //Balances before deposit
      const userUsdcBalance = await MockUSDC.balanceOf(addr0.address);
      const userEuropBalance = await EUROP.balanceOf(addr0.address);
      const peggedUsdcBalance = await MockUSDC.balanceOf(Pegged.target);
      const [, rateEURUSD] = await MockPriceFeed.latestRoundData();
      const rateEURUSDDecimals = Number(await MockPriceFeed.decimals());

      const amountToDeposit = BigInt(1000 * 10 ** 18);

      let expectedEuropAmount = (amountToDeposit * BigInt(10 ** rateEURUSDDecimals)) / BigInt(rateEURUSD);

      // Calculate fee (0.1%)
      const fee = (expectedEuropAmount * BigInt(await Pegged.FEE_BPS()) / BigInt(10000));
      expectedEuropAmount = expectedEuropAmount - fee;

      await MockUSDC.approve(Pegged.target, amountToDeposit);
      await Pegged.deposit(amountToDeposit);

      // Check balances after deposit
      expect(await MockUSDC.balanceOf(addr0.address)).to.equal(userUsdcBalance - amountToDeposit);
      expect(await EUROP.balanceOf(addr0.address)).to.equal(userEuropBalance + expectedEuropAmount);
      expect(await MockUSDC.balanceOf(Pegged.target)).to.equal(amountToDeposit + peggedUsdcBalance);
      expect(await Pegged.revenueBalance()).to.equal(fee); // Check that fee was collected
   });
});
