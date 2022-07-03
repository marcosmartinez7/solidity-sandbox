import { ethers, run, network } from "hardhat";

async function main() {
  const PriceConverter = await ethers.getContractFactory("PriceConverter");
  const priceConverter = await PriceConverter.deploy();
  await priceConverter.deployed();
  console.log("priceConverter deployed to:", priceConverter.address);

  const FundMe = await ethers.getContractFactory("FundMe", {
    libraries: {
      PriceConverter: priceConverter.address,
    },
  });

  const fme = await FundMe.deploy();
  await fme.deployed();

  console.log("FundMe deployed to:", fme.address);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // rinkeby
    console.log("Verifying...");
    await fme.deployTransaction.wait(6);
    await verify(fme.address, []);
  }
}

async function verify(contractAddress: string, args: any) {
  console.log("Verifying contract ..");
  await run("verify:verify", {
    address: contractAddress,
    constructor: args,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
