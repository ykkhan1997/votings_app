'use client'
import Countdown from "react-countdown";
import Image from "next/image";

const Card = ({candidateArray,giveVote}) => {
  return (
    <div className='px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
        <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
            {
                candidateArray.map((el,i)=>(
                    <div key={i+1} className="overflow-hidden border pinkBackground rounded">
                        <Image src={el[3]}
                        alt="Candidate Image"
                        className="object-cover w-full h-64 rounded cursor-pointer"
                        width={200} height={200}
                        />
                        <div className="py-2 pl-2 border border-solid">
                            <p>Id:#{Number(el[0])}</p>
                            <p>Name:{el[2]}</p>
                            <p>Age:{el[4]}</p>
                            <p>Address:{el[1].slice(0,10)}...{el[1].slice(39)}</p>
                            <p>Remaining Time to Vote:{<Countdown date={Number(el[6])}/>}</p>
                        </div>
                        <p className="backgroundColor text-center Color px-1 py-1">Total Vote:{Number(el[5])}</p>
                        <div className="flex justify-end items-center px-1 py-1">
                            <button onClick={()=>Number(el[6]===0)?alert("The time is finished for voting"):giveVote({address:el[1],id:el[0]})} className="backgroundColor rounded-2xl Color px-2 py-2 font-medium tracking-wide  border-solid border-[2px] border-[#9a02ac]">Give Vote</button>
                        </div>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Card