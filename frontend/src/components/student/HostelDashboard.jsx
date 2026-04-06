import React from 'react';
import HostelOverview from './hostel/HostelOverview.jsx';
import RoomDetails from './hostel/RoomDetails.jsx';
import Roommates from './hostel/Roommates.jsx';
import HostelFees from './hostel/HostelFees.jsx';
import MessDetails from './hostel/MessDetails.jsx';
import MessMenu from './hostel/MessMenu.jsx';
import ComplaintSystem from './hostel/ComplaintSystem.jsx';
import LeaveRequest from './hostel/LeaveRequest.jsx';
import WardenInfo from './hostel/WardenInfo.jsx';
import HostelNotifications from './hostel/HostelNotifications.jsx';

const HostelDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-44">
        {/* Top Residential Status Node */}
        <section>
            <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Residential Governance Node</h3>
            </div>
            <HostelOverview />
        </section>

        {/* Primary Residential Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
                <LeaveRequest />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <MessDetails />
                     <RoomDetails />
                </div>
                <MessMenu />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
                <WardenInfo />
                <ComplaintSystem />
                <Roommates />
                <HostelFees />
                <HostelNotifications />
            </div>
        </div>
    </div>
  );
};

export default HostelDashboard;
