import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-gas-reporter";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

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

    await hre.ethers.provider.waitForTransaction(withdrawTx.hash);

    fundBalance = await hre.ethers.provider.getBalance(fme.address);
    console.log("Contract balance: ", fundBalance);
  });

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

    console.log("Funding ... ");
    const fundTx = await fme.fund({ value: "60000000000000000" });
    await hre.ethers.provider.waitForTransaction(fundTx.hash);

    let fundBalance = await hre.ethers.provider.getBalance(fme.address);
    console.log("Contract balance: ", fundBalance);
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.15",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts: [process.env.PRIVATE_KEY!, process.env.PRIVATE_KEY_2!],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
