import React from 'react'
import s from './Loader.module.css'
export default function Loader() {
  return (
    <div className='flex w-full h-full justify-center items-center'>
       <div className={s["loader"]}></div> 
    </div>
    
  )
}
