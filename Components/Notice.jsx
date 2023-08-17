'use client'
import Close from "./Close";
const Notice = ({handleClick}) => {

  return (
      <div className="flex flex-wrap justify-center lg:top-20 top-40 right-0 lg:left-40 items-center overflow-x-hidden overflow-y-auto inset-0 z-50 mt-20 fixed outline-none">  
          <div className="relative  my-6 lg:w-[60%] h-auto w-full max-w-xl flex justify-center  bg-white bg-opacity-90">
        <div className="flex flex-col space-x-2 space-y-2">
          <button className="flex justify-end pr-2 pt-2" onClick={handleClick}><Close/></button>
          <h2 className="mt-5 font-semibold tracking-wide text-xl text-center">
            **Notice for User**
          </h2>
          <p>
            Only Organizer of the voting contract can create candidate
            <span className="font-bold">
              (mean the person who deploy this smart contract)
            </span>
            and register voter for voting. Anyone who is registered can given vote
            to candidate according to their choice.
          </p>
          <h2 className="mt-5 font-semibold tracking-wide text-xl text-center">
            **How this smart contract works**
          </h2>
          <p>
            This is simple smart contract.The person who deploy this smart
            contract can create candidate for competition{" "}
            <a href="http://localhost:3000/candidate-registeration" className="font-bold">
              Candidate Registeration </a> and then he will register the persons for voting <a href="http://localhost:3000/voters-registeration" className="font-bold">
              Voting Register</a> then the registered
            person have right to give vote to any candidate according to their
            choice <a href="http://localhost:3000/" className="font-bold">Vote to Candidate </a>
            <a className="font-bold" href="https://sepolia.etherscan.io/address/0x695Cbde29F2a4c39Ca0eaABd40F75Ee3BB38aC7D#code">See Contract Verification</a>
          </p>
        </div>
      </div>
        
      
    </div>
  );
};

export default Notice;