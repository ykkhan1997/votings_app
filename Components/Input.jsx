'use client'
import React from 'react'

const Input = ({name,placeholder,type,handleClick}) => {
  return (
    <div className='backgroundColor  w-full mb-1 sm:mb-2 flex flex-col'>
      <label className='font-medium text-lg Color mt-2'>{name}</label>
      <input className='w-full px-2 py-2 rounded pinkBackground outline-none placeholder:Color' placeholder={placeholder} type={type} onChange={handleClick}/>
    </div>
  )
}

export default Input