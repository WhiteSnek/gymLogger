import React from 'react'
import { NavBar, Sidebar } from '../components/Dashboard'

const Dashboard = () => {
  return (
    <div className='bg-zinc-800 grid grid-cols-12'>
      <div className='col-span-3'>
        <Sidebar />
      </div>
      <div className='col-span-9'>
        <NavBar />
      </div>
    </div>
  )
}

export default Dashboard
