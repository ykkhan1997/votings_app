"use client";
import React, { useCallback, useContext, useState} from "react";
import { useRouter } from "next/navigation";
import { VotingContext } from "@/context/Voter";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Image1,Upload } from "@/assets";
import { Button, Input } from "@/Components";
const CandidateRegisteration= () => {
  const { setCandidate, uploadToIpfs,candidateArray}=useContext(VotingContext);
  const [fileUrl, setFileUrl] = useState("");
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    age: "",
    address: "",
    deadline: "",
  });
  const onDrop = useCallback(async (acceptedFile) => { 
      const url = await uploadToIpfs(acceptedFile[0]);
      setFileUrl(url);
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 5000000,
  });
  const router=useRouter();
  return (
    <div className="relative overflow-hidden px-4 py-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      
        {fileUrl && (
          <div className="fixed h-[18rem] w-[15rem]  mr-10 max-w-xl mb-16 xl:mb-0 xl:w-1/5 items-center px-4 py-4 backgroundColor rounded-2xl xl:pt-16 pt-5">
           
              <Image
              src={fileUrl}
              className="rounded-2xl"
              width={200}
              height={200}
              alt="Image 1"
            />
            <div className="h-34  mt-10  Color  space-y-2 backgroundColor rounded-2xl px-4 py-4">
              <p>Name:{candidateForm.name}</p>
              <p>Age:{candidateForm.age}</p>
              <p>Address:{candidateForm.address.slice(0,10)}</p>
              <p>Deadline:{candidateForm.deadline}</p>
            </div>
          </div>
        )}
        <div className="flex  flex-col justify-center lg:flex-row">
        {!fileUrl && (
          <div className=" overflow-hidden h-[27rem]  mr-10 w-full max-w-xl mb-16 xl:mb-0  xl:w-1/3 rounded-2xl backgroundColor Color px-4 py-4">
            <div className="space-y-2 flex-wrap overflow-hidden">
              <h2 className="font-semibold  tracking-wide text-center sm:mb-6 pinkBackground rounded-2xl px-2 py-2">
                Create Candidate for Voting
              </h2>
              <p className=" text-center tracking-wide">
                BlockChain Voting Organization,Providing ethereum ecosystem
              </p>
              <h2 className="font-semibold  tracking-wide  text-center sm:mb-6 pinkBackground rounded-2xl px-2 py-2">
                Contract Candidate
              </h2>
            </div>
            <div className="grid  gap-2 grid-cols-2 items-center mt-4 lg:mt-0">
              {candidateArray?.map((el, i) => (
                <div key={i+1} className="flex justify-center items-center xl:flex-col flex-row">
                  <div className="xl:mt-2  w-full h-full px-1 py-1 lg:mt-0 mt-10">
                  <Image
                    src={el[3]}
                    alt="Candidate Image"
                    width={100}
                    height={100}
                  />
                  <p>Name:{el[2]}</p>
                  <p>Age:{el[4]}</p>
                  <p>Address:{el[1].slice(0,5)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full max-w-xl mr-10 mb-16 xl:mb-0 px-9 py-9 xl:w-9/12 backgroundColor Color rounded-2xl overflow-hidden">
          <div className="space-y-2 overflow-hidden">
            <h4 className="font-semibold  tracking-wide  text-center sm:mb-6 pinkBackground Color rounded-2xl px-2 py-2">Create New Candidate</h4>
                <div
              {...getRootProps()}
              className="flex items-center flex-col border border-dotted border-[#9a02ac] overflow-hidden px-2 py-2 text-center"
            >
              <input {...getInputProps()} />
              <p className="text-center">
                Upload File: JPG,PNG,GIF,WEBM Max 10MB
              </p>
              
                <Image src={Upload} className="rounded-2xl" alt="Upload Image"/>
              
              <p>
                Drag & Drop File<span>Or Browse Image</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <Input
              name="Name"
              placeholder={`Candidate Name`}
              type={`text`}
              handleClick={(e) =>setCandidateForm({ ...candidateForm, name: e.target.value })}
            />
            <Input
              name="Age"
              placeholder={`Candidate Age`}
              type={`text`}
              handleClick={(e) =>setCandidateForm({ ...candidateForm, age: e.target.value })}
            />
            <Input
              name="Address"
              placeholder={`Candidate Address`}
              type={`text`}
              handleClick={(e) =>setCandidateForm({ ...candidateForm, address: e.target.value })}
            />
             <Input
              name="Deadline"
              placeholder={`Deadline`}
              type={`date`}
              handleClick={(e) =>setCandidateForm({ ...candidateForm, deadline: e.target.value })}
            />
          </div>
          <div className="flex justify-end xs:justify-center overflow-hidden">
            <Button  btnName={`Authorized Candidate`} handleClick={()=>{setCandidate(candidateForm,router,fileUrl)}}/>
          </div>
        </div>
        <div className="overflow-hidden h-[27rem] w-full max-w-xl mb-16 xl:mb-0 xl:w-1/3 rounded-2xl backgroundColor Color px-9 py-9">
          <div className="space-y-2 flex-wrap overflow-hidden flex flex-col items-center">
            <Image className="border border-dotted border-[#9a02ac] rounded-2xl" src={Image1} alt="Candidate Image" width={200} height={200}/>
            <h4 className="font-semibold mt-4 tracking-wide">Notice For User</h4>
            <p className="text-sm text-center tracking-wider mt-5">Only Organizer of the voting Contract cand create candidate for competition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegisteration;