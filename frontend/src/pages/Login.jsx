import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Google } from '../assets'

const Login = () => {
  const [show,setShow] = useState(false)
  return (
    <div className='fixed w-screen h-screen login-bg flex justify-center items-center'>
      <div className='w-1/3 p-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100'>
      <h1 className='text-4xl font-bold text-gray-200 text-center'>Login</h1>
      <div className='flex flex-col justify-center items-center mt-10 w-full border-b-2 border-white pb-8'>
        <button className='flex w-10/12 justify-center items-center text-white gap-4 border-2 border-white py-2 text-lg'><img src={Google} alt='google' className='w-10' /> <p>Sign in from Google</p></button>
      </div>
      <form className='text-white p-10 flex flex-col gap-4 justify-end'>
        <fieldset className='flex flex-col gap-2'>
        <label htmlFor='username' className='text-lg'>Username: </label>
        <input type='text' id='username' placeholder='Enter your username' className='outline-none border-2 border-gray-300 w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all' />
      </fieldset>
      <fieldset className='flex flex-col gap-2'>
        <label htmlFor='password' className='text-lg'>Password: </label>
        <input type='password' id='password' placeholder='Enter your username' className='outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all' />
      </fieldset>
      <button className='bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5'>Submit</button>
      <Link to='/register' className='underline text-sm'>Don't have an account? Sign up now!</Link>
      </form>
      </div>
    </div>
  )
}

export default Login
