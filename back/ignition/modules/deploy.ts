import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEPLOYMENT_MODULE = buildModule("FullDeployment", (m) => {
   // 1. Deploy MockUSDC and EUROP first
   const MockUSDC = m.contract("MockUSDC");
   const EUROP = m.contract("EUROP");

   // 2. Deploy Pegged with USDC and EUROP addresses
   const Pegged = m.contract("Pegged", [MockUSDC, EUROP]);

   // 3. Transfer ownership of EUROP to Pegged
   m.call(EUROP, "transferOwnership", [Pegged]);

   // Return the deployed contracts
   return { MockUSDC, EUROP, Pegged };
});

export default DEPLOYMENT_MODULE;