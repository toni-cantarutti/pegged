import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { INFURA_API_KEY = "", PRIVATE_KEY = "", ETHERSCAN_API_KEY = "" } = process.env;

const ENABLE_FORKING = false;
// Rabby seedphrase : damage air cement image scan heavy thunder paper property advance chase bind

const config: HardhatUserConfig = {
   networks: {
      hardhat: {
         accounts: [
            "0x55c83c0698e66285eda2fcd158b021f3b24131f9db01024f7a9f5c3fb2bfba5c",
            "0xe3c1438fa0156b7520040564ead0d6b75948190956be61a7ac55902c4bdd6f1c",
            "0x017d98bb16e4667f5030445d31345474f37e429f520cd03039a4b3e40564132d"
         ].map(privateKey => ({ privateKey, balance: "10000000000000000000000" })),
         ...(ENABLE_FORKING
            ? {
               forking: {
                  url: "https://mainnet.infura.io/v3/" + INFURA_API_KEY,
               }
            }
            : {}),
      },
      ...(PRIVATE_KEY.length > 0 && INFURA_API_KEY.length > 0
         ? {
            holesky: {
               url: "https://holesky.infura.io/v3/" + INFURA_API_KEY,
               chainId: 17000,
               accounts: [`0x${PRIVATE_KEY}`],
            },
         }
         : {}), // Provide an empty object instead
   },
   solidity: "0.8.28",
   etherscan: {
      apiKey: {
         holesky: ETHERSCAN_API_KEY,
      },
   },
   sourcify: {
      enabled: true,
   },
};

export default config;
