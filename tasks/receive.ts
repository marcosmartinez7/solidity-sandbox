import { task } from "hardhat/config";
import { assert } from "console";

task("receive", "Funds the FundMe contract by calling receive function")
  .addParam("fma", "The FundMe's address")
  .addParam("accountindex", "Index for account list")

  .setAction(async (taskArgs, hre) => {
    const account = (await hre.ethers.getSigners())[taskArgs.accountindex];
    const receiveTx = await account.sendTransaction({
      to: taskArgs.fma,
      value: "70000000000000000",
    });
    const receiveTxReceipt = await hre.ethers.provider.waitForTransaction(
      receiveTx.hash
    );

    assert(receiveTxReceipt.status);

    const fundBalance = await hre.ethers.provider.getBalance(taskArgs.fma);
    console.log("Contract balance: ", fundBalance);
  });
