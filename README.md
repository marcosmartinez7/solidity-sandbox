# Solidity Sandbox

## FundMe

### Rinkeby

1. `npx hardhat run scripts/deploy.ts --network rinkeby`
2. Fund with address 0: `npx hardhat fund --pca 0x4a456ebe72B10db93C6c6Ea7AfBD02eF5564Fb77 --fma 0xD94dcFF6f3715e2EE015E079925f7f89Bbb536f1 --accountindex 0 --network rinkeby`
3. Fund with address 1 `npx hardhat fund --pca 0x4a456ebe72B10db93C6c6Ea7AfBD02eF5564Fb77 --fma 0xD94dcFF6f3715e2EE015E079925f7f89Bbb536f1 --accountindex 1 --network rinkeby`
4. Withdraw with account that is not the owner `npx hardhat withdraw --pca 0x4a456ebe72B10db93C6c6Ea7AfBD02eF5564Fb77 --fma 0xD94dcFF6f3715e2EE015E079925f7f89Bbb536f1 --accountindex 1 --network rinkeby`
5. Withdraw with owner `npx hardhat fund --pca 0x4a456ebe72B10db93C6c6Ea7AfBD02eF5564Fb77 --fma 0xD94dcFF6f3715e2EE015E079925f7f89Bbb536f1 --accountindex 0 --network rinkeby`
