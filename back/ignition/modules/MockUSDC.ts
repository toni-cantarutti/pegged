// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockUSDCModule = buildModule("MockUSDCModule", (m) => {
   const mockUSDC = m.contract("MockUSDC");
   return { mockUSDC };
});

export default MockUSDCModule;
