import React, { useContext, useState } from 'react'
import { VotingContext } from '@/context/Voter';
import { Logo } from '@/assets';
import Image from 'next/image';
import  {AiFillLock,AiFillUnlock} from 'react-icons/ai';
import Link from 'next/link';
const Navbar = () => {
  const [opeNav,setOpenNav]=useState(true);
  const {currentAccount,connectWallet}=useContext(VotingContext);
  const openNavigation=()=>{
    if(!opeNav){
      setOpenNav(true);
    }else{
      if(opeNav){
        setOpenNav(false);
      }
    }
  }
  return (
    <div className='flex flex-col items-end   w-full'>
      <div className='backgroundColor w-full px-2 py-2 flex justify-between items-center'>
      <Image src={Logo} alt='Logo' width={100} height={80}/>
      <div className='px-2 py-2 bg-[#9a02ac] rounded font-medium Color'>
        {
          currentAccount?(<div className='inline-flex items-center space-x-1 cursor-pointer'>
            {opeNav?<AiFillLock onClick={()=>openNavigation()}/>:<AiFillUnlock onClick={()=>openNavigation()}/>}
            {currentAccount.slice(0,9)}...{currentAccount.slice(39)}
          </div>):(<button  onClick={()=>connectWallet()}>Connect Wallet</button>)
        }
      </div>
      </div>
     {
      opeNav && (
        <div className='top-20 flex justify-end  flex-1 min-w-[140px] p-6 rounded absolute bg-[#9a02ac] z-10'>
        <ul className='Color font-medium space-y-2'>
        <p><Link href={{pathname:'/'}}>Home</Link></p>
        <p><Link href={{pathname:'candidate-registeration'}}>Candidate Registeration</Link></p>
        <p><Link href={{pathname:'voters-registeration'}}>Voters Registeration</Link></p>
        <p><Link href={{pathname:'voterList'}}>Voters List</Link></p>
        </ul>
      </div>
      )
     }
    </div>
  )
}

export default Navbar