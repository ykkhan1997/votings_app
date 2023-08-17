"use client";
import React, { useContext, useEffect, useState } from "react";
import { VotingContext } from "@/context/Voter";
import Countdown from "react-countdown";
import Card from "@/Components/Card";
import {Notice } from "@/Components";
import {useRouter} from "next/navigation";
const Home = () => {
  const [showBanner,setShowBanner]=useState(false);
  const router=useRouter();

  const {
    currentAccount,
    candidateLength,
    voterLength,
    giveVote,
    candidateArray,
    formattedTime,
    winnerArray
  } = useContext(VotingContext);
  useEffect(()=>{
    // const hasShowNotice=localStorage.getItem('hasShownNotice');
    // if(!hasShowNotice){]
    setShowBanner(true);
      const timeId=setTimeout(() => {
        setShowBanner(false);
      }, 10000);
      
      return ()=>clearTimeout(timeId);
      // localStorage.setItem('hasShownNotice','true');
    // }
  },[]);
  return (
    <div className="relative overflow-hidden px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="70%">
        {currentAccount && (
          <div className="flex flex-col items-center justify-between lg:flex-row lg:space-y-0 space-y-10">
            <div className="w-full max-w-xl backgroundColor flex flex-row lg:w-5/12 space-x-2 px-2 py-2 h-15 items-center rounded justify-between overflow-hidden">
              <p className="pinkBackground Color px-2 py-2 flex-wrap w-full h-full rounded">
                No. Candidate:{Number(candidateLength)}
              </p>
              <p className="pinkBackground Color px-2 py-2 flex-wrap   w-full h-full rounded">
                No. Voter:{voterLength}
              </p>
            </div>
            {winnerArray?.map((el,i)=>(<div key={i+1} className="px-2 py-2 backgroundColor rounded">{el[6]!=<Countdown date={`00:00:00:00`}/>?<Countdown className="bg-[#9a02ac] px-2 py-1" date={Number(el[6])}/>:<button className="bg-[#9a02ac] px-2 py-2 rounded Color tracking-wide" onClick={()=>router.push('/winner')}>See Winner Candidate</button>}</div>))}
            <div className="rounded text-center text-3xl bg-[#9a02ac] bg-opacity-30 Color  w-full max-w-xl  lg:w-1/6 border border-solid border-[#9a02ac] px-2 py-2 h-15 items-center overflow-hidden xl:ml-16 ml-2">
              {formattedTime}
            </div>
           
          </div>
        )}
        <Card candidateArray={candidateArray}  giveVote={giveVote}/>
        {
          showBanner && <Notice handleClick={()=>setShowBanner(false)}/>
        }
      </div>
    </div>
  );
};

export default Home;