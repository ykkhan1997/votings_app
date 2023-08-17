'use client'
import { useContext, useState } from "react";
import { Logo } from "@/assets";
import Image from "next/image";
import React from "react";
import { VotingContext } from "@/context/Voter";
import {AiFillLock, AiFillUnlock} from 'react-icons/ai';
import Link from "next/link";

const Navbar = () => {
    const [openNav, setOpenNav] = useState(true);

    const openNavigation = () => {
        setOpenNav(!openNav);
    }

    const { currentAccount, connectWallet } = useContext(VotingContext);
    return (
        <div className="flex px-4 py-4 backgroundColor  justify-between items-center">
            <Link href={{pathname:"/"}}><Image src={Logo} alt="Logo" width={100} height={80} className="cursor-pointer"/></Link>
            {!currentAccount ? (
                <button className="pinkBackground px-2 py-2 Color" onClick={connectWallet}>
                    Connect Wallet
                </button>
            ) : (
                <div className="pinkBackground Color px-2 py-2 rounded font-medium tracking-wide inline-flex items-center space-x-2">
                    <div className="cursor-pointer" onClick={openNavigation}>
                        {openNav ? <AiFillUnlock /> : <AiFillLock />}
                    </div>
                    <div>{currentAccount.slice(0, 10)}....{currentAccount.slice(39)}</div>
                </div>
            )}
            {currentAccount && openNav && (
                <ul className="absolute Color cursor-pointer space-y-2  p-6  min-w-[140px] pinkBackground top-20 right-0 mx-4 my-2 rounded-xl z-50">
                    <li className="font-medium tracking-wide hover:text-white">
                        <Link href={{pathname:'/'}}>Home</Link>
                    </li>
                    <li className="font-medium tracking-wide hover:text-white"><Link href={{pathname:'/candidate-registeration'}}>Candidate Registeration</Link></li>
                    <li className="font-medium tracking-wide hover:text-white"><Link href={{pathname:'/voters-registeration'}}>Voter Registeration</Link></li>
                    <li className="font-medium tracking-wide hover:text-white"><Link href={{pathname:'voterList'}}>Voter List</Link></li>  
                </ul>
            )}
        </div>
    );
};

export default Navbar;