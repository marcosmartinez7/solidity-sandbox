import { ethers } from "hardhat";

async function main() {
  const FundMe = await ethers.getContractFactory("FundMe");
  const fME = await FundMe.deploy();

  await fME.deployed();

  console.log("FundMe deployed to:", fME.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
