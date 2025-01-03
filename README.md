[authorBadge]: https://img.shields.io/badge/Author-Toni%20CANTARUTTI-blue
[authorLink]: https://github.com/toni-cantarutti?tab=repositories
[licenseBadge]: https://img.shields.io/badge/License-MIT-brightgreen.svg
[licenseLink]: LICENSE
[peggedBanner]: peggedBanner.png

[![Author][authorBadge]][authorLink]
[![License][licenseBadge]][licenseLink]

![Pegged Banner][peggedBanner]

# Pegged

A decentralized, fair, and transparent euro stablecoin protocol

## Context and Challenges

Adoption of cryptocurrencies and decentralized finance by the general public requires efficient and liquid euro stablecoins. Most current stablecoins are dollar-pegged, exposing European users to systemic exchange rate risks. Additionally, centralized stablecoins often fail to redistribute generated revenues, leading to inefficiency in locked capital and unfair value capture, as profits are not shared with the users who contribute to the system's success.

## Value Proposition

PEGGED is a decentralized, overcollateralized euro stablecoin protocol governed by a decentralized autonomous organization (DAO). Collateralized with stable dollar assets, it maintains its euro peg using a delta-neutral hedging mechanism. Revenue generated is redistributed to protocol participants.

## Protocol Mechanics

### Users

Provide USDC stablecoin as collateral. Users receive euro-equivalent stablecoins minted at the oracle rate.
If the dollar appreciates, the protocol becomes overcollateralized.
If the dollar depreciates, the protocol risks undercollateralization.

### Hedgers

Specialized participants who hedge the protocol's dollar collateral against EUR/USD exchange risks. They deposit collateral and benefit from EUR/USD volatility, earning if the dollar strengthens and losing if it weakens. Hedgers maintain a 3% minimum collateral-to-position ratio, ensuring the protocol is overcollateralized by 103%. If the ratio falls to 2%, liquidation is triggered and the protocol profits 2% and burns repurchased stablecoins.

To manage their own risk exposure, hedgers typically utilize traditional forex instruments such as CME EUR/USD options and futures. These instruments allow hedgers to create offsetting positions in traditional markets, effectively neutralizing their exposure to EUR/USD movements while still providing the essential hedging service to the protocol.

### Implications

Hedgers must provide upfront capital. Closing a hedging position requires transferring it to another hedger.
Users can redeem stablecoins for euro-equivalent USDC collateral anytime.

### Incentives and Yield

Mechanisms under consideration include on/off-ramp fees, collateral yield redistribution, and reduced carry trade costs for hedgers.
Yield strategies could involve conservative approaches like lending on aave or investing in T-bills depending on the current market conditions.

## License

Under the MIT license. See the [LICENSE][licenseLink] file for details.
