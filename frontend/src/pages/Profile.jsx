import React, { useState } from 'react';
import { NavBar, Sidebar } from '../components/Profile';
import LogWorkout from '../components/Profile/LogWorkout/LogWorkout';
import Dashboard from '../components/Profile/Dashboard/Dashboard';
import NewPlan from '../components/Profile/NewPlan/NewPlan';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('log-workout');

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'log-workout':
        return <LogWorkout changeTab={changeTab} />;
      case 'dashboard':
        return <Dashboard />;
      case 'new plan':
        return <NewPlan />
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className='bg-zinc-800 grid grid-cols-8'>
      <div className='col-span-1'>
        <Sidebar changeTab={changeTab} />
      </div>
      <div className='col-span-7 mx-6'>
        <NavBar />
        <div className='min-h-[75vh]'>
        {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
