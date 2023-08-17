const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Create", function () {
  let create;
  let owner, addr1, addr2,addr3,addr4,addr5;
  let deadline = Math.floor(Date.now() / 1000) + 3600;
  let name = "Yasir";
  let age = "15";
  let image = "Image.jpeg";
  let ipfs = "ipfshash";

  beforeEach(async () => {
    const Create = await ethers.getContractFactory("Create");
    [owner, addr1, addr2,addr3,addr4,addr5] = await ethers.getSigners();
    create = await Create.deploy();
  });
  it("Should check the contract Owner", async () => {
    const votingOrganizer = await create.votingOrganizer();
    expect(votingOrganizer).to.equal(owner.address);
  });
  it("Should set the candidate", async () => {
    await create
      .connect(owner)
      .setCandidate(addr1.address, deadline, name, age, image, ipfs);
    const candidateData = await create.getCandidateData(addr1.address);
    expect(candidateData[0]).to.equal(1);
    expect(candidateData[1]).to.equal(addr1.address);
    expect(candidateData[2]).to.equal(name);
    expect(candidateData[3]).to.equal(image);
    expect(candidateData[4]).to.equal(age);
    expect(candidateData[5]).to.equal(ipfs);
    expect(candidateData[6]).to.equal(0);

    const getCandidateAddress = await create.getCandidate();
    expect(getCandidateAddress).to.deep.equal([addr1.address]);
    // expect(getCandidateAddress).to.include(addr1.address);
    const getCandidateLength = await create.getCandidateLength();
    expect(getCandidateLength).to.equal(1);
  });
  it("Should reverted with error when we  set candidate", async () => {
    await expect(
      create
        .connect(addr1)
        .setCandidate(addr2.address, deadline, name, age, image, ipfs)
    ).to.be.revertedWith("Only voting Organizer can set Candidate");
    // const newTimeStamp = deadline + 3800;
    // await ethers.provider.send("evm_setNextBlockTimestamp", [newTimeStamp]);
    // await expect(
    //   create
    //     .connect(owner)
    //     .setCandidate(addr1.address, deadline, name, age, image, ipfs)
    // ).to.be.revertedWith("Candidate deadline should be in the future");
  });
  it("Should create a voterRight and also check reverted errors",async()=>{
    await create.connect(owner).setCandidate(addr1.address,deadline,name,age,image,ipfs);
    await create.connect(owner).voterRight(addr2.address,name,image,ipfs);
    // await create.connect(owner).voterRight(addr3.address,name,image,ipfs);
    // await create.connect(owner).voterRight(addr4.address,name,image,ipfs);
    // const getVoterAddress=await create.getVoterAddress();
    // expect(getVoterAddress).to.deep.equal([[addr2.address,addr3.address,addr4.address],Number(3)]);
    const getVoterData=await create.getVoterData(addr2.address);
    expect(getVoterData[0]).to.equal(1);
    expect(getVoterData[1]).to.equal(addr2.address);
    expect(getVoterData[2]).to.equal(name);
    expect(getVoterData[3]).to.equal(image);
    expect(getVoterData[4]).to.equal(ipfs);
    expect(getVoterData[5]).to.equal(1000);
    expect(getVoterData[6]).to.equal(false);

  });
  it("Should give a vote and also check the right winner",async()=>{
    await create.connect(owner).setCandidate(addr1.address,deadline,name,age,image,ipfs);
    await create.connect(owner).setCandidate(addr2.address,deadline,name,age,image,ipfs);
    await create.connect(owner).voterRight(addr3.address,name,image,ipfs);
    await create.connect(owner).voterRight(addr4.address,name,image,ipfs);
    await create.connect(owner).voterRight(addr5.address,name,image,ipfs);
    await create.connect(addr3).vote(addr1.address,1);
    await create.connect(addr4).vote(addr2.address,2);
    await create.connect(addr5).vote(addr2.address,2);
    const getCandidateAddress=await create.getCandidateData(addr1.address);
    const getCandidateAddress2=await create.getCandidateData(addr2.address);
    expect(getCandidateAddress[6]).to.equal(1);
    expect(getCandidateAddress2[6]).to.equal(2);
    const voterData=await create.voters(addr3.address);
    expect(voterData.voter_voted).to.equal(true);
    expect()
    const winner=await create.getWinners();
    expect(winner).to.deep.equal(addr2.address);
  })
});