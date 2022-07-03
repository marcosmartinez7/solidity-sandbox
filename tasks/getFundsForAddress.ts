import { task } from "hardhat/config";
task("getFundsForAddress", "Get funds for address")
  .addParam("pca", "The PriceConverter's address")
  .addParam("fma", "The FundMe's address")
  .addParam("accountindex", "Index for account list")
  .setAction(async (taskArgs, hre) => {
    const PriceConverter = await hre.ethers.getContractFactory(
      "PriceConverter"
    );
    const priceConverter = PriceConverter.attach(taskArgs.pca);

    const FundMe = await hre.ethers.getContractFactory("FundMe", {
      libraries: {
        PriceConverter: priceConverter.address,
      },
    });

    const fme = FundMe.attach(taskArgs.fma);
    const funder = (await hre.ethers.getSigners())[taskArgs.accountindex];

    const funderBalance = await fme.addressToAmountFunded(funder.address);
    console.log("Funder balance: ", funderBalance);
  });
