import React, { useContext, useState } from "react";
import Image from "next/image";
import { Logo } from "@/assets";
import { VotingContext } from "@/context/Voter";
import {AiFillLock,AiFillUnlock} from 'react-icons/ai';
import Link from "next/link";
const Navbar = () => {
  const [toogle, setToogle] = useState(true);
  const {currentAccount,connectWallet}=useContext(VotingContext);
  return (
    <div>
    <navbar className="flex justify-between  items-center w-full py-6 backgroundColor">
      <Image src={Logo} width={100} height={60} alt="logo"/>
      <div className="flex flex-1 justify-end items-center mr-4">
        {
            currentAccount?(<div className="bg-[#9a02ac] Color h-12  items-center  px-4 py-2 rounded font-medium tracking-wide inline-flex cursor-pointer">{toogle?<AiFillLock className="mr-2" onClick={()=>setToogle(false)}/>:<AiFillUnlock onClick={()=>setToogle(true)}  className="mr-2"/>}{currentAccount.slice(0,9)}...{currentAccount.slice(39)}</div>)
            :
            (<button className="bg-[#9a02ac] Color h-12  items-center  px-4 py-2 rounded font-medium tracking-wide inline-flex" onClick={()=>connectWallet()}>Connect Wallet</button>)
        }
      </div>
    </navbar>
    {toogle && <div className=" w-[140px] p-6 absolute bg-discount_gradient top-20 right-0 mx-4 my-2 min-w-[140px] bg-[#9a02ac] z-10 rounded-xl sidebar"
    >
      <ul className="list-none flex-col  justify-end items-center flex-1 space-y-2">
        <li className="font-medium text-[16px] leading-5 Color"><Link href={{pathname:'/'}}>Home</Link></li>
        <li className="font-medium text-[16px] leading-5 Color"><Link href={{pathname:'/candidate-registeration'}}>Candidate Reg</Link></li>
        <li className="font-medium text-[16px] leading-5 Color"><Link href={{pathname:'/voters-registeration'}}>Voter Reg</Link></li>
        <li className="font-medium text-[16px] leading-5 Color"><Link href={{pathname:'/voterList'}}>Voter List</Link></li>
      </ul>
    </div>
    }
    </div>
  );
};

export default Navbar;