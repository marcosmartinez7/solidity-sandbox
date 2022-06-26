# Solidity Sandbox

## FundMe

### Rinkeby

1. `npx hardhat run scripts/deploy.ts --network rinkeby`
2. `const FundMe = await ethers.getContractFactory("FundMe");`
3. `const fme= FundMe.attach("address");`
4. `fme.getConversionRate(123).then(console.log) // 152286`
5. `fme.fund({value: "60000000000000000"}).then(console.log)`
6. `ethers.provider.getBalance(fme.address).then(console.log)`
