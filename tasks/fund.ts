import { task } from "hardhat/config";
import { assert } from "console";

task("fund", "Funds the FundMe contract")
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

    console.log("Funding ... ");
    const fundTx = await fme
      .connect(funder)
      .fund({ value: "60000000000000000" });
    const fundTxReceipt = await hre.ethers.provider.waitForTransaction(
      fundTx.hash
    );
    assert(fundTxReceipt.status);

    const fundBalance = await hre.ethers.provider.getBalance(fme.address);
    console.log("Contract balance: ", fundBalance);

    const funderBalance = await fme.addressToAmountFunded(funder.address);
    console.log("Funder balance: ", funderBalance);
  });
