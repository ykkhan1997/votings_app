import CreateAbi from '../artifacts/contracts/VotingContracts.sol/Create.json';
import {create as IPFSHTTPClient} from 'ipfs-http-client';
export const votingAbi=CreateAbi.abi;
export const votingAddress=process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const projectId=process.env.NEXT_PUBLIC_PROJECT_ID
const projectSecretKey=process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY
const auth="Basic "+Buffer.from(projectId+":"+projectSecretKey).toString("base64");
export const client=IPFSHTTPClient({
    host:"ipfs.infura.io",
    port:5001,
    protocol:"https",
    headers:{
        authorization:auth
    }
});