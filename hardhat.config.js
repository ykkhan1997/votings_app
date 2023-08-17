require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path:'.env.local'});
task("accounts","Print the list of accounts").setAction(async(taskArgs,hre)=>{

  const accounts=await hre.ethers.getSigners();
  for(let account of accounts){
    console.log(account.address);
  }
});
const alchemyUrl=process.env.NEXT_PUBLIC_ALCHEMY_URL;
const privateKey=process.env.NEXT_PUBLIC_PRIVATE_KEY;
const etherScanPrivateKey=process.env.NEXT_PUBLIC_ETHER_SCAN_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.19",
  defaultNetwork:"Sepolia",
  networks:{
    hardhat:{},
    Sepolia:{
      url:alchemyUrl,
      accounts:[privateKey]
    }
  },
  etherscan:{
    apiKey:etherScanPrivateKey
  }
};
