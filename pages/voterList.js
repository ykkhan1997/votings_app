'use client'
import React, { useContext } from 'react'
import { VotingContext } from '@/context/Voter'
import Image from 'next/image'
const VoterList = () => {
    const {voterArray}=useContext(VotingContext);
  return (
    <div className='px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
        <div className='py-20 font-semibold text-2xl leading-5 w-full text-center Color'>All Registered Voters</div>
        <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
            {
                voterArray?.map((el,i)=>(
                    <div key={i+1} className='overflow-hidden border pinkBackground rounded'>
                        <Image src={el[3]} alt='Voter Image' className='object-cover w-full h-64 rounded' height={200} width={200}/>
                        <div className='py-5 pl-2 border border-dotted border-[#9a02ac]'>
                            <p>Id:#{Number(el[0])}</p>
                            <p>Name:{el[2]}</p>
                            <p>Address:{el[1].slice(0,10)}...{el[1].slice(39)}</p>
                            <p>Voted:{el[6]==true?"You already voted":"Not Voted"}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default VoterList;