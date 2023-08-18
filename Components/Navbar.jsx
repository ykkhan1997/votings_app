import React,{useState,useContext} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {AiFillLock,AiFillUnlock} from 'react-icons/ai';
import Style from '../styles/Navbar.module.css';
//Internal Import
import { VotingContext } from '@/context/Voter';
import { Logo } from '@/assets';
const Navbar = () => {
  const {connectWallet,currentAccount}=useContext(VotingContext);
  const [openNav,setOpenNav]=useState(true);
  const openNavigation=()=>{
    if(openNav){
      setOpenNav(false);
    }else{
      if(!openNav){
        setOpenNav(true);
      }
    }
  }
  return (
    <div className={`w-[100%] height-[5.5rem] bg-[#231e39] mb-[2rem] backgroundColor`}>
      <div className={` w-[80%] m-auto flex items-center justify-between text-white`}>
        <div className={`cursor-pointer`}>
          <Link href={{pathname:'/'}}>
            <Image src={Logo} alt='logo' width={100} height={60}/>
          </Link>
        </div>
        <div className={` bg-[#9a02ac] p-[.5rem] cursor-pointer rounded`}>
          {
            currentAccount?(
              <div>
                <div className={Style.connect_flex}>
                  <button onClick={()=>openNavigation()}>
                    {currentAccount.slice(0,9)}...{currentAccount.slice(39)}
                  </button>
                  {
                    currentAccount && (
                      <span className='cursor-pointer'>
                        {openNav?(<AiFillUnlock onClick={()=>openNavigation()}/>):
                        (<AiFillLock onClick={()=>openNavigation()}/>
                        )
                        }
                        </span>
                    )
                  }
                </div>
                {openNav && 
                (
                  <div className={`absolute bg-[#9a02ac] p-6 w-[15rem] top-[4rem] rounded-sm z-10`}>
                    <p className='Color hover:text-white'><Link href={{pathname:'/'}}>Home</Link></p>
                    <p className='Color hover:text-white'><Link href={{pathname:'candidate-registeration'}}>Candidate Registeration</Link></p>
                    <p className='Color hover:text-white'><Link href={{pathname:'voters-registeration'}}>Voter Registeration</Link></p>
                    <p className='Color hover:text-white'><Link href={{pathname:'voterList'}}>Voter List</Link></p>
                  </div>
                )
                }
              </div>
            ):(
              <button onClick={()=>connectWallet()}>Connect Wallet</button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar