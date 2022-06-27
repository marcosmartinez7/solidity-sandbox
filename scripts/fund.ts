import { ethers } from "hardhat";

async function main() {
  const PriceConverter = await ethers.getContractFactory("PriceConverter");
  const priceConverter = PriceConverter.attach(
    "0x4a467E17318b3d6EC3B712dA19353954FCAd9512"
  );

  const FundMe = await ethers.getContractFactory("FundMe", {
    libraries: {
      PriceConverter: priceConverter.address,
    },
  });

  const fme = FundMe.attach("0xd6e8cce6Ef5830fD7B8A182842d1e9150505EE4d");

  console.log("Funding ... ");
  const fundTx = await fme.fund({ value: "60000000000000000" });
  await ethers.provider.waitForTransaction(fundTx.hash);

  let fundBalance = await ethers.provider.getBalance(fme.address);
  console.log("Contract balance: ", fundBalance);

  console.log("Withdrawing .. ");
  const withdrawTx = await fme.withdraw();
  await ethers.provider.waitForTransaction(withdrawTx.hash);

  fundBalance = await ethers.provider.getBalance(fme.address);
  console.log("Contract balance: ", fundBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
