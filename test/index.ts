import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleStorage", function () {
  it("Should store", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();

    const setGreetingTx = await simpleStorage.store(1);

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await simpleStorage.favoriteNumber()).to.equal(1);
  });
});

describe("FundMe", function () {
  it("Deploy", async function () {
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
  });
});
