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

   // 4. Mint USDC to user addresses & Mint USDC to Pegged contract for hedging collat
   const balance = BigInt(1000000);  // Convert to USDC decimals (6 decimals instead of 18)
   m.call(MockUSDC, "mint", ["0xa0a1FB514E2098F84c7DD188763ba7dBf35E664A", balance], { id: "mint_addr0" });
   m.call(MockUSDC, "mint", ["0xb33923F0d0D2be5Ad1069BB5F3632Eddb63b1C82", balance], { id: "mint_addr1" });
   m.call(MockUSDC, "mint", ["0x72F295BcF9aE09f18CD3f95232e566199A1ac526", balance], { id: "mint_addr2" });
   m.call(MockUSDC, "mint", [Pegged, BigInt(100000)], { id: "mint_pegged" });

   // Return the deployed contracts
   return { MockUSDC, EUROP, Pegged, MockPriceFeed };
});

export default DEPLOYMENT_MODULE;