import {House , MagnifyingGlass, Star, Gear} from '@phosphor-icons/react'
import { Link } from "react-router-dom"
import { useEffect } from 'react'
import useAuth from '../hooks/UseAuth'
import { useState } from 'react'


const SideBar = ({user}) => {

  return (
    <div className='
    w-2/12 h-screen left-0 '>
        <Link to="/profile" className='px-4 p-4 flex justify-start items-center ' >
        <img src={user?.image} width={350} height={350} alt="img"
        className='rounded-full w-10 h-10' />
        <h1 className=' font-semi-bold mx-2 text-md font-mono ' > {`${user?.first_name} ${user?.last_name}`} </h1>
        </Link>

        <Link to='/' className='pt-4 px-4 flex justify-start items-center' >
        <House size={32} />
        <h1 className=' font-semi-bold mx-2 text-lg font-mono' >Beranda</h1>
        </Link>

        <Link className='px-4 pt-4 flex justify-start items-center' >
        <MagnifyingGlass size={32} />
        <h1 className=' font-semi-bold mx-2 text-lg font-mono' >Search</h1>
        </Link>
        
        <Link className='px-4 p-4 flex justify-start items-center border-b-2' >
        <Star size={32} />
        <h1 className=' font-semi-bold mx-2 text-lg font-mono' >Popular</h1>
        </Link>

        <Link className='px-4 pt-4 flex justify-start items-center ' >
        <Gear size={32} />
        <h1 className=' font-semi-bold mx-2 text-lg font-mono' >Lainnya</h1>
        </Link>
    </div>
  )
}

export default SideBar