import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEPLOYMENT_MODULE = buildModule("FullDeployment", (m) => {
   // 1. Deploy MockUSDC, EUROP and MockPriceFeed first
   const MockUSDC = m.contract("MockUSDC");
   const EUROP = m.contract("EUROP");
   const MockPriceFeed = m.contract("MockPriceFeed");

   // 2. Deploy Pegged with USDC and EUROP addresses
   const Pegged = m.contract("Pegged", [MockUSDC, EUROP, MockPriceFeed]);

   // 3. Transfer ownership of EUROP to Pegged
   m.call(EUROP, "transferOwnership", [Pegged]);

   // Return the deployed contracts
   return { MockUSDC, EUROP, Pegged, MockPriceFeed };
});

export default DEPLOYMENT_MODULE;