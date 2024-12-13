import { loadFixture, impersonateAccount, setBalance } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { deployFixture } from "./deployFixture";
import { ethers } from "hardhat";
import { EUROP } from "../typechain-types";

describe("EUROP", function () {

   it("Check that Pegged contract is set as EUROP owner", async function () {
      const { EUROP, Pegged } = await loadFixture(deployFixture);
      expect(await EUROP.owner()).to.equal(
         Pegged.target,
         "Pegged contract should be the owner of EUROP"
      );
   });

   it("Mint and burn method impersonated as Pegged contract", async function () {
      const { EUROP, Pegged, addr0 } = await loadFixture(deployFixture);
      const mintAmount = 1000n;

      // Impersonate the Pegged contract
      await impersonateAccount(Pegged.target.toString());
      await setBalance(Pegged.target.toString(), 100n ** 18n);
      const peggedSigner = await ethers.getSigner(Pegged.target.toString());
      const europFromPegged = EUROP.connect(peggedSigner) as EUROP;

      // Mint EUROP tokens directly from the Pegged contract to addr0
      await europFromPegged.mint(addr0.address, mintAmount);
      // Verify the minted amount
      expect(await EUROP.balanceOf(addr0.address)).to.equal(
         mintAmount,
         "Incorrect minted amount"
      );

      // Burn EUROP tokens directly from the Pegged contract to addr0
      await europFromPegged.burn(addr0.address, mintAmount);
      // Verify the remaining balance
      expect(await EUROP.balanceOf(addr0.address)).to.equal(
         0n,
         "Incorrect remaining balance after burn"
      );
   });

   it("Should revert when non-owner tries to mint or burn", async function () {
      const { EUROP, addr0 } = await loadFixture(deployFixture);
      const amount = 1000n;

      // Try to mint as non-owner
      await expect(
         (EUROP.connect(addr0) as EUROP).mint(addr0.address, amount)
      ).to.be.revertedWithCustomError(
         EUROP,
         "OwnableUnauthorizedAccount"
      ).withArgs(addr0.address);

      // Try to burn as non-owner
      await expect(
         (EUROP.connect(addr0) as EUROP).burn(addr0.address, amount)
      ).to.be.revertedWithCustomError(
         EUROP,
         "OwnableUnauthorizedAccount"
      ).withArgs(addr0.address);
   });
});