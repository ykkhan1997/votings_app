import React from 'react'

const Button = ({btnName,handleClick}) => {
  return (
    <button onClick={handleClick} className='overflow-hidden flex-wrap pinkBackground Color px-2 py-2 mt-2 h-12 rounded-2xl'>{btnName}</button>
  )
}

export default Button