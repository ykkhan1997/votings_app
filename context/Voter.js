"use client";
import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { votingAddress, votingAbi, client } from './constants.js';
import { toast } from "react-toastify";
export const fetchContract = (ProviderOrSigner) =>
  new ethers.Contract(votingAddress, votingAbi, ProviderOrSigner);
export const VotingContext = createContext();
const alchemyUrl=process.env.NEXT_PUBLIC_ALCHEMY_URL
const VoterProvider = ({ children }) => {
  //Candidate Data
  const pushCandidate = [];
  const candidateInext = [];
  const votedVoters=[];
  const [candidateLength, setCandidateLength] = useState(candidateInext);
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  //Voter Data
  const highestVote = [];
  const pushVoter = [];
  const [winnerArray, setWinnerArray] = useState(highestVote);
  const [voterLength, setVoterLength] = useState();
  const [voterAddress, setVoterAddress] = useState();
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [reSetting,setResetting]=useState(false);
  const [votingOrganizer,setVotingOrganizer]=useState("");
  const [isMobile,setIsMobile]=useState(false);
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);
  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return setError("Please Install Web3 Wallet");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length>0) {
      setCurrentAccount(accounts[0]);
    } else {
      toast.warn("Please Install Web3 Wallet & Connect,Reload");
    }
  };
  const connectWallet=async()=>{
    if (isMobile) {
      alert('To connect your Metamask Mobile wallet, open the Metamask Mobile app and navigate to our DApp.');
    }else{
      if(!window.ethereum){
        toast.warn("Please Install Web3 Wallet and Connect");
        return;
      }
      try{
        const accounts=await window.ethereum.request({method:'eth_requestAccounts'});
        setCurrentAccount(accounts[0]);
      }catch(error){
        toast.error("Failed to connect wallet"+error.message);
      }
    }
  }
  useEffect(()=>{
    if(window.ethereum){
      const chainId=window.ethereum.request({method:'eth_chainId'});
      const handleChainChanged=(chainId)=>{

      }
      window.ethereum.on("chainChanged",handleChainChanged);
    }
  },[]);
  useEffect(()=>{
    if(window.ethereum){
      const accountsChanged=async()=>{
        try{
          const accounts=await window.ethereum.request({method:'eth_accounts'});
          if(accounts.length>0){
          setCurrentAccount(accounts[0]);
          }
        }catch(error){
          toast.warn("Error fetching Accounts",error);
      }

      }
      const handleAccountsChanged=()=>{
        accountsChanged();
      }
      window.ethereum.on('accountsChanged',handleAccountsChanged);
    } 
  },[]);

  const uploadToIpfs = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      toast.warn(`Error uploading file to ipfs ${error}`);
    }
  };
  const setCandidate = async (candidateForm, router, fileUrl) => {
    try {
      const { name, address, age, deadline } = candidateForm;
      if (!name || !address || !age || !deadline)
        return toast.warn("Input filed is missing");
      const data = JSON.stringify({
        name,
        address,
        age,
        image: fileUrl,
        deadline,
      });
      const added = await client.add(data);
      const ipfs = `https://ipfs.io/ipfs/${added.path}`;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
      if(currentAccount!=votingOrganizer)return toast.warn("Only Organizer Can set Candidate");
      const candidate = await contract.setCandidate(
        address,
        new Date(deadline).getTime(),
        name,
        age,
        fileUrl,
        ipfs
      );
      candidate.wait();
      router.push("/");
      toast.success("Successfully Created Candidate");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      toast.warn("Something wrong while setCandidate");
      console.log(error);
    }
  };
  const getNewCandidate = async () => {
    const provider = new ethers.JsonRpcProvider(alchemyUrl);
    const contract = fetchContract(provider);
    try {
      const allcandidate = await contract.getCandidate();
      allcandidate.map(async (el, i) => {
        const singleCandidateData = await contract.getCandidateData(el);
        pushCandidate.push(singleCandidateData);
        candidateInext.push(singleCandidateData[0]);
        const getCandidateLength = await contract.getCandidateLength();
        setCandidateLength(Number(getCandidateLength));
      });
    } catch (error) {
      toast.warn("Something Wrong while fetching candidateData");
      console.log(error, "Something Wrong while fetching candidateData");
    }
  };
  const createVoter = async (formInput, fileUrl, router) => {
    try {
      const { name, position, address } = formInput;
      if (!name || !position || !address) toast.warn("Input field is missing");
      const data = JSON.stringify({ name, position, address, image: fileUrl });
      const added = await client.add(data);
      const ipfs = `https://ipfs.io/ipfs/${added.path}`;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
      if(currentAccount!=votingOrganizer)return toast.warn("Only Organizer can register voter");
      const voter = await contract.voterRight(address, name, fileUrl, ipfs);
      voter.wait();
      toast.success("You have successfully registered voter");
      router.push("/voterList");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      toast.warn("Something wrong while creating voter");
    }
  };
  const getNewVoterData = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(alchemyUrl);
      const contract = fetchContract(provider);
      const [getVoterAddress, voterLength] = await contract.getVoterAddress();
      const votersAddress = getVoterAddress.map((address) =>
        address.toLowerCase()
      );
      setVoterAddress(votersAddress);
      const voterList = voterLength;
      setVoterLength(Number(voterList));
      for (let el of getVoterAddress) {
        const singleVoterData = await contract.getVoterData(el);
        pushVoter.push(singleVoterData);
      }
    } catch (error) {
      currentAccount && toast.warn("Something wrong while fetching voterData");
      console.log(error);
    }
  };
  const giveVote = async (id) => {
    try {
      const voterAddress = id.address;
      const voterId = id.id;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
      const Votes=await contract.getVotedVoterList();
      for(let voted of Votes){
        votedVoters.push(voted);
      }
      if(votedVoters.includes(voterAddress)){
        toast.warn("Soory Your already voted");
      }
      const voters = await contract.vote(voterAddress, voterId);
      voters.wait();
      toast.success("You give successfuly voted");
      console.log("You give successfuly voted");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  const getWinnerCandidate=async()=>{
    const provider=new ethers.JsonRpcProvider(alchemyUrl);
    const contract=fetchContract(provider);
    try{
      const winner=await contract.winnerCandidate();
      const getWinnerData=await contract.getCandidateData(winner);
      highestVote.push(getWinnerData);
    }catch(error){
      console.log(error);
    }
  }
  const resetWinnerCandidate=async()=>{
    try{
      setResetting(true);
      const provider=new ethers.BrowserProvider(window.ethereum);
      const signer=await provider.getSigner();
      const contract=fetchContract(signer);
      if(currentAccount!=votingOrganizer)return toast.warn("Only Organizer can reset winner Candidate");
      const resetWinner=await contract.resetWinner();
      await resetWinner.wait();
      toast.success("Successfully reset winner");

    }catch(error){
      toast.warn("Something wrong while resetting winner");
      console.log(error);
    }finally{
      setResetting(false);
    }
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
  useEffect(() => {
    const IntervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(IntervalId);
    };
  }, []);
  useEffect(()=>{
    getNewCandidate();
    getNewVoterData();
    getWinnerCandidate();
    connectWallet();
  },[]);
  useEffect(()=>{
    const getOrganizer=async()=>{
      const provider=new ethers.JsonRpcProvider(alchemyUrl);
    const contract=fetchContract(provider);
    const organizer=await contract.votingOrganizer();
    const lowerCaseOrganizer = organizer.toLowerCase();
    setVotingOrganizer(lowerCaseOrganizer);
    };
    getOrganizer();
  },[]);
  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <VotingContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        currentAccount,
        uploadToIpfs,
        setCandidate,
        candidateArray,
        candidateLength,
        createVoter,
        voterLength,
        voterAddress,
        voterArray,
        giveVote,
        formattedTime,
        winnerArray,
        resetWinnerCandidate,
        reSetting,
        votingOrganizer
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export default VoterProvider;