import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../assets'

const Header = () => {
  return (
    <header className='flex justify-between p-4 bg-black text-white'>
      <div className='flex gap-2 items-center'>
        <img src={Logo} alt='logo' className='h-10 aspect-square' />
        <p className='text-lg bowlby-one-regular'>Gym Logger</p>
      </div>
      <div className='flex text-lg gap-10'>
        <Link className='nav-link'>Create Plan</Link>
        <Link className='nav-link'>My Plans</Link>
        <Link className='nav-link'>Exercises</Link>

      </div>
      <div className='px-10'>
        <button className='relative px-6 py-2 coolBeans text-lg text-white border-2 border-red-600'><Link to='/login' className=' font-bold'>Login</Link></button>
      </div>
    </header>
  )
}

export default Header
