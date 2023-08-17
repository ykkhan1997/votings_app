import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { Logo } from '@/assets';
import { VotingContext } from '@/context/Voter';
import {AiFillLock,AiFillUnlock} from 'react-icons/ai';
import Link from 'next/link';
const Navbar = () => {
    const {currentAccount,connectWallet}=useContext(VotingContext);
    const [openToogle,setOpenToogle]=useState(false);
    const navLinks=["Home","Candidate Registeration","Voter Registeration","VoterList"]
  return (
    <nav className='flex justify-between items-center w-full py-6 backgroundColor'>
        <Image src={Logo} alt='Logo' width={100} height={60}/>
        <div className='flex flex-1 justify-end items-center mr-4'>
        {
            currentAccount?(<button className='h-12 px-2 py-2 bg-[#9a02ac] Color rounded font-medium tracking-wide inline-flex items-center space-x-2'>{openToogle?<AiFillUnlock onClick={()=>setOpenToogle(false)}/>:<AiFillLock onClick={()=>setOpenToogle(true)}/>}{currentAccount.slice(0,9)}...{currentAccount.slice(39)}</button>)
            :
            (<button className='h-12 px-2 py-2 bg-[#9a02ac] Color rounded font-medium tracking-wide' onClick={()=>connectWallet()}>Connect Wallet</button>)
        }
        </div>
        {
            openToogle && (
                <div className='p-6 absolute bg-[#9a02ac] top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl z-10'>
                    <ul className='list-none flex-col justify-end items-center flex-1 space-y-4'>
                        <li className='font-poppins font-medium text-[16px] cursor-pointer Color'>
                            <Link href={{pathname:'/'}}>Home</Link>
                        </li>
                        <li className='font-poppins font-medium text-[16px] cursor-pointer Color'>
                        <Link href={{pathname:'/candidate-registeration'}}>Candidate Registeration</Link>
                        </li>
                        <li className='font-poppins font-medium text-[16px] cursor-pointer Color'>
                        <Link href={{pathname:'/voters-registeration'}}>Voters Registeration</Link>
                        </li>
                        <li className='font-poppins font-medium text-[16px] cursor-pointer Color'>
                        <Link href={{pathname:'/voterList'}}>Voter List</Link>
                        </li>
                    </ul>
                </div>
            )
        }
    </nav>
  )
}

export default Navbar