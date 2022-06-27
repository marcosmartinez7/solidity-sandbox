import { ethers } from "hardhat";

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

  const fME = await FundMe.deploy();
  await fME.deployed();

  console.log("FundMe deployed to:", fME.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
