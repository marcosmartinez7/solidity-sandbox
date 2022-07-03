import { task } from "hardhat/config";
import { assert } from "console";

task("withdraw", "Get funds of the FundMe contract")
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

    let fundBalance = await hre.ethers.provider.getBalance(fme.address);
    console.log("Contract balance: ", fundBalance);

    console.log("Withdrawing .. ");
    const withdrawAccount = (await hre.ethers.getSigners())[
      taskArgs.accountindex
    ];

    const withdrawTx = await fme.connect(withdrawAccount).withdraw();

    const withdrawTxReceipt = await hre.ethers.provider.waitForTransaction(
      withdrawTx.hash
    );

    assert(withdrawTxReceipt.status);

    fundBalance = await hre.ethers.provider.getBalance(fme.address);
    console.log("Contract balance: ", fundBalance);
  });
