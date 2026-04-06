import React from 'react';
import { motion } from 'framer-motion';
import ProfileSummary from './academic/ProfileSummary.jsx';
import KPICards from './academic/KPICards.jsx';
import CourseRegistration from './academic/CourseRegistration.jsx';
import Timetable from './academic/Timetable.jsx';
import Attendance from './academic/Attendance.jsx';
import Results from './academic/Results.jsx';
import Fees from './academic/Fees.jsx';
import Notifications from './academic/Notifications.jsx';

const AcademicDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-44">
        {/* Top Intelligence Layer */}
        <section>
            <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Core Academic Intelligence Node</h3>
            </div>
            <KPICards />
        </section>

        {/* Primary Data Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
                 <ProfileSummary />
                 <CourseRegistration />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Timetable />
                    <Attendance />
                 </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
                 <Notifications />
                 <Results />
                 <Fees />
            </div>
        </div>
    </div>
  );
};

export default AcademicDashboard;
