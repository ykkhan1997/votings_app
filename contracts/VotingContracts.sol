// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    //Global Data
    using Counters for Counters.Counter;
    Counters.Counter public _candidateId;
    Counters.Counter public _voterId;
    address public votingOrganizer;
    address public winnerCandidate;

    //Candidate Data
    struct Candidate {
        uint256 id;
        address _address;
        string name;
        string image;
        string age;
        string ipfs;
        uint256 deadline;
        uint256 voteCount;
    }
    address[] public candidateAddress;
    mapping(address => Candidate) public candidates;
    //Voter Data
    struct Voter {
        uint256 voterId;
        address voter_Address;
        string voterName;
        string voterImage;
        string voterIPfs;
        uint256 voter_vote;
        uint256 voter_allowed;
        bool voter_voted;
    }
    address[] public voterAddress;
    address[] public votedVoters;
    mapping(address => Voter) public voters;

    constructor() {
        votingOrganizer = msg.sender;
        winnerCandidate = address(0);
    }

    //Candidate functions
    function setCandidate(
        address _address,
        uint256 _deadline,
        string memory _name,
        string memory _age,
        string memory _image,
        string memory _ipfs
    ) public {
        Candidate storage candidate = candidates[_address];
        require(
            msg.sender==votingOrganizer,
            "Only voting Organizer can set Candidate"
        );
        require(
            candidate.deadline<block.timestamp,
            "Candidate deadline should be in the future"
        );
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();
        candidate.id = idNumber;
        candidate._address = _address;
        candidate.name = _name;
        candidate.image = _image;
        candidate.age = _age;
        candidate.ipfs = _ipfs;
        candidate.deadline = _deadline;
        candidate.voteCount = 0;
        candidateAddress.push(_address);
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidateData(
        address _address
    )
        public
        view
        returns (
            uint256,
            address,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            candidates[_address].id,
            candidates[_address]._address,
            candidates[_address].name,
            candidates[_address].image,
            candidates[_address].age,
            candidates[_address].voteCount,
            candidates[_address].deadline
        );
    }

    function voterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        Voter storage voter = voters[_address];
        require(msg.sender==votingOrganizer, "Only Organizer can register voter");
        require(voter.voter_allowed == 0);
        _voterId.increment();
        uint256 IdNumber = _voterId.current();
        voter.voterId = IdNumber;
        voter.voter_Address = _address;
        voter.voterName = _name;
        voter.voterImage = _image;
        voter.voterIPfs = _ipfs;
        voter.voter_allowed = 1;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voterAddress.push(_address);
    }
    function getVoterAddress()public view returns(address[] memory,uint256 ){
        return (voterAddress,voterAddress.length);
    }
    function getVoterData(address _address)public view returns(uint256,address,string memory,string memory,string memory,uint256,bool){
        return(
            voters[_address].voterId,
            voters[_address].voter_Address,
            voters[_address].voterName,
            voters[_address].voterImage,
            voters[_address].voterIPfs,
            voters[_address].voter_vote,
            voters[_address].voter_voted
            );
    }
    function vote(address _candidateAddress,uint256 _candidateVoterId)external{
        Voter storage voter=voters[msg.sender];
        require(!voter.voter_voted,"You have already voted");
        voter.voter_allowed++;
        require(voter.voter_allowed>0,"You have no right to vote");
        voter.voter_allowed--;
        voter.voter_voted=true;
        votedVoters.push(msg.sender);
        voter.voter_vote=_candidateVoterId;
        candidates[_candidateAddress].voteCount+=voter.voter_allowed;
        if(candidates[_candidateAddress].voteCount>candidates[winnerCandidate].voteCount){
            winnerCandidate=_candidateAddress;
        }
    }
    function getVotedVoterList()public view returns(address[] memory){
        return votedVoters;
    }
    function resetWinner()public {
        require(msg.sender==votingOrganizer,"Only Organizer can reset winner");
        winnerCandidate=address(0);
    }
}