import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import hre from "hardhat";
import { bigint } from "hardhat/internal/core/params/argumentTypes";

const contractName = "MockUSDC";

describe(contractName, function () {
   async function deployFixture() {
      const [addr0, addr1, addr2] = await hre.ethers.getSigners();
      const contract = await hre.ethers.deployContract(contractName);
      return { contract, addr0, addr1, addr2 };
   }

   describe("Initial state", function () {
      it("Mint 100000 tokens to all initial addresses", async function () {
         const { contract, addr0, addr1, addr2 } = await loadFixture(deployFixture);
         const expectedBalance = BigInt(100000) * BigInt(10 ** 18); // 100000 tokens with 18 decimals

         // Check balance for each address
         const addresses = [addr0, addr1, addr2];
         for (const addr of addresses) {
            expect(await contract.balanceOf(addr.address)).to.equal(
               expectedBalance,
               `Address ${addr.address} should have ${expectedBalance} tokens`
            );
         }
         // Verify total supply
         expect(await contract.totalSupply()).to.equal(
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
