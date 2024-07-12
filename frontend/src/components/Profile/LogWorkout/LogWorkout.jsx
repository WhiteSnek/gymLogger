import React from 'react'

const LogWorkout = ({changeTab}) => {
  return (
    <div className='flex text-white flex-col justify-center items-center p-4'>
      You don't have any active plans yet
      <button onClick={()=>changeTab('new plan')} className='bg-white text-gray-950 py-2 px-4 shadow-lg hover:scale-105 transition-all m-6'>Create a plan</button>
    </div>
  )
}

export default LogWorkout
