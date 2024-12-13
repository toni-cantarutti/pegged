import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { deployFixture } from "./deployFixture";

describe("Pegged", function () {
   it("Should have correct USDC and EUROP addresses", async function () {
      const { Pegged, MockUSDC, EUROP } = await loadFixture(deployFixture);
      expect(await Pegged.usdc()).to.equal(MockUSDC.target);
      expect(await Pegged.europ()).to.equal(EUROP.target);
   });

   it("Should deposit USDC and mint EUROP 1:1", async function () {
      const { Pegged, MockUSDC, EUROP, addr0 } = await loadFixture(deployFixture);
      const amount = BigInt(1000) * BigInt(10 ** 18);

      // Approve USDC spending
      await MockUSDC.approve(Pegged.target, amount);

      // Check balances before deposit
      const userUsdcBalance = await MockUSDC.balanceOf(addr0.address);
      const userEuropBalance = await EUROP.balanceOf(addr0.address);

      // Deposit USDC
      await Pegged.deposit(amount);

      // Check balances after deposit
      expect(await MockUSDC.balanceOf(addr0.address)).to.equal(userUsdcBalance - amount);
      expect(await MockUSDC.balanceOf(Pegged.target)).to.equal(amount);
      expect(await EUROP.balanceOf(addr0.address)).to.equal(userEuropBalance + amount);
   });

   it("Should withdraw USDC by burning EUROP 1:1", async function () {
      const { Pegged, MockUSDC, EUROP, addr0 } = await loadFixture(deployFixture);
      const amount = BigInt(1000) * BigInt(10 ** 18);

      // Setup: First deposit USDC
      await MockUSDC.approve(Pegged.target, amount);
      await Pegged.deposit(amount);

      // Check balances before withdrawal
      const userUsdcBalance = await MockUSDC.balanceOf(addr0.address);
      const userEuropBalance = await EUROP.balanceOf(addr0.address);
      const peggedUsdcBalance = await MockUSDC.balanceOf(Pegged.target);

      // Withdraw USDC
      await Pegged.withdraw(amount);

      // Check balances after withdrawal
      expect(await MockUSDC.balanceOf(addr0.address)).to.equal(userUsdcBalance + amount);
      expect(await MockUSDC.balanceOf(Pegged.target)).to.equal(peggedUsdcBalance - amount);
      expect(await EUROP.balanceOf(addr0.address)).to.equal(userEuropBalance - amount);
   });

});