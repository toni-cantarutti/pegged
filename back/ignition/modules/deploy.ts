import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEPLOYMENT_MODULE = buildModule("FullDeployment", (m) => {
   // 1. Deploy MockUSDC and EUROP first
   const mockUSDC = m.contract("MockUSDC");
   const europ = m.contract("EUROP");

   // 2. Deploy Pegged with USDC and EUROP addresses
   const pegged = m.contract("Pegged", [mockUSDC, europ]);

   // 3. Transfer ownership of EUROP to Pegged
   m.call(europ, "transferOwnership", [pegged]);

   // Return the deployed contracts
   return { mockUSDC, europ, pegged };
});

export default DEPLOYMENT_MODULE;