import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage } from "../typechain";

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage: SimpleStorage;
  this.beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();
  });
  it("Should start with 0", async function () {
    expect(await simpleStorage.favoriteNumber()).to.equal(0);
  });
  it("Should store 1", async function () {
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
