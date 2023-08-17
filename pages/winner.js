'use client'
import React, { useContext, useEffect, useState } from 'react'
import { VotingContext } from '@/context/Voter';
import Image from 'next/image'
import ReactConfetti from 'react-confetti';
const Winner = () => {
  const [showConfetti,setShowConfetti]=useState(false);
  const {winnerArray,resetWinnerCandidate,reSetting}=useContext(VotingContext);
  useEffect(()=>{
    setShowConfetti(true);
  },[]);
  return (
    <div className='px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      { showConfetti && <ReactConfetti/>}
      <div className='flex justify-center items-center'>
      <p className='text-center leading-5 tracking-wider font-semibold mt-20 lg:text-3xl text-xl Color bg-[#9a02ac] px-2 py-2 bg-opacity-30 rounded'>Winner Candidate</p>
      </div>
      <div className='mt-10 flex flex-col px-4 py-4 rounded-2xl bg-[#231E39] bg-opacity-30  sm:max-w-sm sm:mx-auto lg:max-w-auto'>
        {
          winnerArray?.map((el,i)=>(
            <div key={i+1}>
              <Image src={el[3]} alt='Winner Image' className='object-cover w-full h-64 rounded cursor-pointer' width={200} height={200}/>
            <div className='justify-start px-2 py-2 Color space-y-2'>
              <p>Id#{Number(el[0])}</p>
              <p>Name:{el[2]}</p>
              <p>Age:{el[4]}</p>
              <p>Address:{el[1].slice(0,10)}...{el[1].slice(39)}</p>
            </div>
            </div>
          ))
        }
        <button onClick={resetWinnerCandidate} disabled={reSetting} className='mt-2 px-2 py-2 rounded Color font- flex justify-center bg-[#9a02ac] w-full'>Reset Candidate</button>
      </div>
    </div>
  )
}

export default Winner