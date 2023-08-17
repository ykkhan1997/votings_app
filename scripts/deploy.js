const { ethers } = require("hardhat");


async function main(){

    const Create=await ethers.deployContract("Create");
    const create=await Create.waitForDeployment();
    console.log(create.target);
}
main().then(
    ()=>process.exit(0)
).catch((error)=>{
    console.log(error);
    process.exit(1);
});