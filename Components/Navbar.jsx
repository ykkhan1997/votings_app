import { Logo } from '@/assets'
import Image from 'next/image'
import Link from 'next/link'
import { VotingContext } from '@/context/Voter'
import { useContext, useState } from 'react'
import {AiFillLock,AiFillUnlock}from 'react-icons/ai';
const Navbar = () => {
  const {currentAccount,connectWallet}=useContext(VotingContext);
  const [toogle,setToogle]=useState(true);
  return (
    <div className='backgroundColor'>
      <div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-8'>
        <div className='relative flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href={{pathname:'/'}}><Image src={Logo} alt='Logo' width={80} height={60}/></Link>
            <ul className='lg:flex hidden space-x-8 ml-60'>
              <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'/'}}>Home</Link></li>
              <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'candidate-registeration'}}>Candidate Registeration</Link></li>
              <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'voters-registeration'}}>Voters Registeration</Link></li>
              <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'voterList'}}>Voter List</Link></li>
            </ul>
          </div>
         <div className='flex  space-x-8'>
         {
            currentAccount?
            (<div className='Color bg-[#9a02ac] px-2 py-2 rounded font-medium tracking-wide inline-flex items-center'><div className='lg:hidden flex cursor-pointer'>{toogle?<AiFillLock onClick={()=>setToogle(false)}/>:<AiFillUnlock onClick={()=>setToogle(true)}/>}</div>{currentAccount.slice(0,9)}...{currentAccount.slice(39)}</div>)
            :
            (<button className='Color bg-[#9a02ac] px-2 py-2 rounded font-medium tracking-wide' onClick={()=>connectWallet()}>Connect Wallet</button>)
          }
          <div
          className={`${toogle?"flex":"hidden"} p-6 absolute bg-[#9a02ac] top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl z-10 lg:hidden flex`}>
            <ul className='list-none flex-col justify-end items-center flex-1'>
            <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'/'}}>Home</Link></li>
              <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'candidate-registeration'}}>Candidate Registeration</Link></li>
              <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'voters-registeration'}}>Voters Registeration</Link></li>
              <li className='text-[16px] font-medium Color active:text-white'><Link href={{pathname:'voterList'}}>Voter List</Link></li>
            </ul>
          </div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar