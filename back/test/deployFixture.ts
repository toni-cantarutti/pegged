import hre from "hardhat";
import DEPLOYMENT_MODULE from "../ignition/modules/deploy";

export async function deployFixture() {
   // Get signers
   const [addr0, addr1, addr2] = await hre.ethers.getSigners();

   // Deploy using Ignition module
   const { MockUSDC, EUROP, Pegged, MockPriceFeed } = await hre.ignition.deploy(DEPLOYMENT_MODULE);

   return {
      MockUSDC,
      EUROP,
      Pegged,
      MockPriceFeed,
      addr0,
      addr1,
      addr2
   };
}