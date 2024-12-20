import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { deployFixture } from "./deployFixture";

describe("MockUSDC", function () {
   it("Check Deployment minting", async function () {
      const { MockUSDC, addr0, addr1, addr2, Pegged } = await loadFixture(deployFixture);
      const expectedBalance = BigInt(1000000) * BigInt(10 ** 18);

      // Check balance for each address
      const addresses = [addr0, addr1, addr2];
      for (const addr of addresses) {
         expect(await MockUSDC.balanceOf(addr.address)).to.equal(
            expectedBalance,
            `Address ${addr.address} should have ${expectedBalance} tokens`
         );
      }
      // Verify total supply
      expect(await MockUSDC.totalSupply()).to.equal(
         expectedBalance * BigInt(addresses.length) + BigInt(await MockUSDC.balanceOf(Pegged.target)),
         "Total supply should match sum of all minted tokens"
      );
   });

   it("Mint method", async function () {
      const { MockUSDC, addr0 } = await loadFixture(deployFixture);
      await MockUSDC.mint(addr0.address, 1000000);
      const expectedBalance = BigInt(2000000) * BigInt(10 ** 18);
      expect(await MockUSDC.balanceOf(addr0.address)).to.equal(
         expectedBalance,
         `Address ${addr0.address} should have ${expectedBalance} tokens`
      );
   });
});
