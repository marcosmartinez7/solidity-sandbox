# Solidity Sandbox

## FundMe

### Rinkeby

1. `npx hardhat run scripts/deploy.ts --network rinkeby`
2. Fund with address 0: `npx hardhat fund --pca 0xC8bF11D63A2ef8FC007A9705a73B8914631Ed368 --fma 0xD706D5abf9a33e5D976DCc55deA1720Cf5bf46C0 --accountindex 0 --network rinkeby`
3. Fund with address 1 `npx hardhat fund --pca 0xC8bF11D63A2ef8FC007A9705a73B8914631Ed368 --fma 0xD706D5abf9a33e5D976DCc55deA1720Cf5bf46C0 --accountindex 1 --network rinkeby`
4. Withdraw with account that is not the owner `npx hardhat withdraw --pca 0xC8bF11D63A2ef8FC007A9705a73B8914631Ed368 --fma 0xD706D5abf9a33e5D976DCc55deA1720Cf5bf46C0 --accountindex 1 --network rinkeby`
5. Withdraw with owner `npx hardhat withdraw --pca 0xC8bF11D63A2ef8FC007A9705a73B8914631Ed368 --fma 0xD706D5abf9a33e5D976DCc55deA1720Cf5bf46C0 --accountindex 0 --network rinkeby`
6. Fund by sending ether (receive function) `npx hardhat receive --fma 0xD706D5abf9a33e5D976DCc55deA1720Cf5bf46C0 --accountindex 0 --network rinkeby`
7. Get funder balance `npx hardhat getFundsForAddress --pca 0xC8bF11D63A2ef8FC007A9705a73B8914631Ed368 --fma 0xD706D5abf9a33e5D976DCc55deA1720Cf5bf46C0 --accountindex 0 --network rinkeby`
