'use client'
import React, { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { VotingContext } from '@/context/Voter';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Image1, Upload } from '@/assets';
import { Button, Input } from '@/Components';
import { toast } from 'react-toastify';
const VoterRegisteration = () => {
    const {uploadToIpfs,createVoter,voterArray,currentAccount,votingOrganizer}=useContext(VotingContext);
    const [formInput,setFormInput]=useState({
        name:"",
        position:"",
        address:""
    });
    const router=useRouter();
    const [fileUrl,setFileUrl]=useState();
    const onDrop = useCallback(async (acceptedFile) => { 
        if(currentAccount!=votingOrganizer){
          toast.warn("Only Organizer can upload Image on ipfs");
        }
        else{
          const url = await uploadToIpfs(acceptedFile[0]);
          setFileUrl(url);
        }
      });
    const {getRootProps,getInputProps}=useDropzone({
        onDrop,
        // accept:"image/*",
        maxSize:5000000

    });
  return (
    <div className="relative overflow-hidden px-4 py-20 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {
            fileUrl && (
                <div className='fixed xl:justify-start h-[18rem] w-[15rem] max-w-xl mb-16 xl:mb-0 xl:w-1/5 items-center px-4 py-4 backgroundColor rounded-2xl xl:pt-16 pt-5'>
                    <Image src={fileUrl} width={200} height={200} alt='Voter Image'/>
                    <div className='h-34  Color space-y-2 backgroundColor rounded-3xl px-4 py-4'>
                        <p>Name:{formInput.name}</p>
                        <p>Position:{formInput.position}</p>
                        <p>Address:{formInput.address.slice(0,10)}</p>
                    </div>
                </div>
            )
        }
        <div className='flex flex-col justify-center lg:flex-row'>
            {
                !fileUrl && (
                    <div className='overflow-hidden h-[27rem] mr-10 w-full max-w-xl mb-16 xl:mb-0 xl:w-1/3 rounded-2xl px-4 py-4 Color backgroundColor'>
                        <div className='space-y-2 mt-5 flex-wrap overflow-hidden'>
                            <h2 className='font-semibold  tracking-wide text-center sm:mb-6 pinkBackground rounded-2xl px-2 py-2'>Register Voter for Voting</h2>
                            <p className='text-center tracking-wide'>Blockchain Votig Organization,Providing Ethereum Ecosystem</p>
                            <h2 className='font-semibold  tracking-wide  text-center sm:mb-6 pinkBackground rounded-2xl px-2 py-2'>Contract Candidate</h2>
                        </div>
                        <div className='grid gap-2 grid-cols-2 items-center mt-4 lg:mt-0'>
                            {
                                voterArray?.map((el,i)=>(

                                    <div key={i+1} className='flex justify-center items-center xl:flex-col flex-row'>
                                        <div className='xl:mt-2 w-full h-full px-1 py-1 lg:mt-0 mt-10'>
                                            <Image
                                            src={el[3]}
                                            alt='Voter Image'
                                            width={100}
                                            height={100}
                                            />
                                            <p>Id#{Number(el[0])}</p>
                                            <p>Name:{el[2]}</p>
                                            <p>Address:{el[1].slice(0,5)}</p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                )
            }
            <div className='w-full max-w-xl mr-10 mb-16 xl:mb-0 px-9 py-9 xl:w-9/12 backgroundColor rounded-2xl overflow-hidden'>
                <div className='space-y-2 overflow-hidden'>
                    <h4 className='font-semibold  tracking-wide  text-center sm:mb-6 pinkBackground Color rounded-2xl px-2 py-2'>Create New Voter</h4>
                    <div {...getRootProps()} className='flex items-center flex-col border border-dotted border-[#9a02ac] Color overflow-hidden px-2 py-2 text-center'>
                        <input {...getInputProps()}/>
                        <p>Upload File:JPG,PNG,GIF,WEBM,Max 10MB</p>
                        <Image src={Upload} className='rounded-2xl' alt='upload Image'/>
                        <p>Drag & Drop File<span>Or Browse Image</span></p>
                    </div>
                </div>
                <div className='overflow-hidden'>
                    <Input name='Name' placeholder={`Voter Name`} type={`text`} handleClick={(e)=>setFormInput({...formInput,name:e.target.value})}/>
                    <Input name={`Position`} placeholder={`Voter Position`} type={`text`} handleClick={(e)=>setFormInput({...formInput,position:e.target.value})}/>
                    <Input name={`Address`} placeholder={`Voter Address`} type={`text`} handleClick={(e)=>setFormInput({...formInput,address:e.target.value})}/>
                </div>
                <div className='flex xl:justify-end justify-center overflow-hidden'>
                    <Button btnName={`Authorized Voter`} handleClick={()=>createVoter(formInput,fileUrl,router)}/>
                </div>
            </div>
            <div className='overflow-hidden h-[27rem] w-full max-w-xl mr-10 mb-16 xl:mb-0  xl:w-1/3 rounded-2xl px-4 py-4 Color backgroundColor'>
                <div className='flex flex-wrap space-y-2 flex-col items-center mt-5'>
                    <Image className='border border-dotted border-[#deace4] rounded-2xl' src={Image1} alt='Candidate Image' width={200} height={200}/>
                    <h4 className='mt-4 font-semibold tracking-wide'>Notice For User</h4>
                    <p className='text-wider text-sm text-center mt-5'>Only Organizer of the voting contract can register voter</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VoterRegisteration;