import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='p-4 flex flex-col gap-6 bg-zinc-900 border-4 text-white text-xl text-center font-bold border-red-500 m-4 rounded-lg shadow-lg'>
      <NavLink 
        to='/dashboard' 
        className={({ isActive }) => `${isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'} p-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        Profile
      </NavLink>
      <NavLink 
        to='/profile' 
        className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} p-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        Log workout
      </NavLink>
      <NavLink 
        to='/about' 
        className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} p-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        Create new plan
      </NavLink>
      <NavLink 
        to='/contact' 
        className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} p-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        View plans
      </NavLink>
      <NavLink 
        to='/settings' 
        className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} p-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        View your PRs
      </NavLink>
      <NavLink 
        to='/settings' 
        className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} p-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        Logout
      </NavLink>
      <NavLink 
        to='/settings' 
        className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-white'} p-4 hover:bg-zinc-800 rounded transition-colors duration-200`}
      >
        Settings
      </NavLink>
    </div>
  );
}

export default Sidebar;
