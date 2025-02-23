import Image from 'next/image'
import React from 'react'
import { joyStickGif } from '../../../public'

const Loading = () => {
  return (
    <div className="absolute z-50 inset-0 h-screen bg-white flex justify-center items-center">
    <Image src={joyStickGif} alt="Loading..." />
  </div>
  )
}

export default Loading
