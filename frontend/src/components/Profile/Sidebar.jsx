import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ changeTab }) => {
  return (
    <div className='p-4 flex flex-col justify-between h-[85vh] fixed bg-zinc-950 border-4 text-white text-center font-thin border-red-500 m-4 rounded-lg shadow-lg'>
      <div className='flex flex-col gap-2'>
        <button
          onClick={() => changeTab('dashboard')}
          className='py-2 px-4 hover:bg-zinc-800 rounded transition-colors duration-200 text-white'
        >
          Profile
        </button>
        <button 
          onClick={() => changeTab('log-workout')}
          className='py-2 px-4 hover:bg-zinc-800 rounded transition-colors duration-200 text-white'
        >
          Log workout
        </button>
        <button 
          onClick={() => changeTab('new plan')}
          className='py-2 px-4 hover:bg-zinc-800 rounded transition-colors duration-200 text-white'
        >
          Create new plan
        </button>
        <button 
          onClick={() => changeTab('plans')}
          className='py-2 px-4 hover:bg-zinc-800 rounded transition-colors duration-200 text-white'
        >
          View plans
        </button>
        <button 
          onClick={() => changeTab('pr')}
          className='py-2 px-4 hover:bg-zinc-800 rounded transition-colors duration-200 text-white'
        >
          View your PRs
        </button>
        
      </div>
      <div className='flex flex-col'>
      <NavLink 
          to='/settings' 
          className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} py-2 px-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
        >
          Logout
        </NavLink>
      <NavLink 
        to='/settings' 
        className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} py-2 px-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        Settings
      </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
