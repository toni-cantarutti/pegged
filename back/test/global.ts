import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import hre from "hardhat";
import DEPLOYMENT_MODULE from "../ignition/modules/deploy";

describe("Pegged", function () {
   async function deployFixture() {
      // Get signers
      const [addr0, addr1, addr2] = await hre.ethers.getSigners();

      // Deploy using Ignition module
      const { mockUSDC, europ, pegged } = await hre.ignition.deploy(DEPLOYMENT_MODULE);

      return {
         mockUSDC, europ, pegged,
         addr0,
         addr1,
         addr2
      };
   }

   describe("Initial state", function () {
      it("Should set Pegged contract as EUROP owner", async function () {
         const { europ, pegged } = await loadFixture(deployFixture);
         expect(await europ.owner()).to.equal(
            pegged.target,
            "Pegged contract should be the owner of EUROP"
         );
      });
      it("Mint 100000 tokens to all initial addresses", async function () {
         const { mockUSDC, addr0, addr1, addr2 } = await loadFixture(deployFixture);
         const expectedBalance = BigInt(100000) * BigInt(10 ** 18);

         // Check balance for each address
         const addresses = [addr0, addr1, addr2];
         for (const addr of addresses) {
            expect(await mockUSDC.balanceOf(addr.address)).to.equal(
               expectedBalance,
               `Address ${addr.address} should have ${expectedBalance} tokens`
            );
         }
         // Verify total supply
         expect(await mockUSDC.totalSupply()).to.equal(
            expectedBalance * BigInt(addresses.length),
            "Total supply should match sum of all minted tokens"
         );
      });
   });

   describe("Global (minimal😅) testing ", function () {

      // it("1.Test a custom error: Only owner can add voters ", async function () {
      //    const { contract, addr1 } = await loadFixture(deployFixture);

      //    await expect(contract.connect(addr1).registerVoter(addr1))
      //       .to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
      //       .withArgs(addr1.address);
      // });

      // it("2.Test an emit: Owner add a voter → emit event ", async function () {
      //    const { contract, addr1 } = await loadFixture(deployFixture);
      //    await expect(contract.registerVoter(addr1))
      //       .to.emit(contract, "VoterRegistered")
      //       .withArgs(addr1.address);
      // });

      // it("3.Test a storage variable assign", async function () {
      //    const { contract, owner } = await loadFixture(deployFixture);
      //    await contract.registerVoter(owner);
      //    assert((await contract.voters(owner)).isRegistered === true);
      // });
   });
});
