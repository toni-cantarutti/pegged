// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev MockUSDC contract for testing purposes.
 * @author @Toni
 */
contract MockUSDC is ERC20 {
    /**
     * @dev Constructor for the MockUSDC contract.
     * @dev Initializes the contract with 100,000 tokens for the deployer.
     */
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(0xa0a1FB514E2098F84c7DD188763ba7dBf35E664A, 100000 * 10 ** 18);
        _mint(0xb33923F0d0D2be5Ad1069BB5F3632Eddb63b1C82, 100000 * 10 ** 18);
        _mint(0x72F295BcF9aE09f18CD3f95232e566199A1ac526, 100000 * 10 ** 18);
    }

    /**
     * @dev Mint tokens to an address.
     * @param to The address to mint tokens to.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) public {
        _mint(to, amount * 10 ** 18);
    }
}
