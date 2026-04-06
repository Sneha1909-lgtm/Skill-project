import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Home, 
  MapPin, 
  Calendar, 
  Zap, 
  Award, 
  Users, 
  CreditCard, 
  MessageSquare,
  Coffee,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileText,
  Globe
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import AcademicDashboard from '../components/student/AcademicDashboard.jsx';
import HostelDashboard from '../components/student/HostelDashboard.jsx';
import LMSDashboard from '../components/student/LMSDashboard.jsx';
import Badge from '../components/ui/Badge.jsx';

const StudentPage = () => {
  const { name } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('academic');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['academic', 'hostel', 'lms'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'academic', label: 'Academic Module', icon: BookOpen, detail: 'Performance + Learning' },
    { id: 'hostel', label: 'Hostel Module', icon: Home, detail: 'Living + Facilities' },
    { id: 'lms', label: 'LMS Module', icon: Globe, detail: 'Resources + Content' }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-secondary-dark transition-colors duration-500 relative overflow-hidden glass-mesh">
      {/* Iridescent Background Orbs */}
      <div className="iridescent-orb w-[600px] h-[600px] -top-96 -left-40 animate-float opacity-20" />
      <div className="iridescent-orb w-[500px] h-[500px] -bottom-40 -right-40 animate-float opacity-10" style={{ animationDelay: '2s' }} />
      <div className="iridescent-orb w-[300px] h-[300px] top-1/2 left-1/3 animate-pulse-slow opacity-5" style={{ animationDelay: '4s' }} />

      {/* Header Context Bar */}
      <div className="bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-4 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-soft">
              {activeTab === 'academic' ? <BookOpen size={20} /> : <Home size={20} />}
           </div>
           <div>
              <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white capitalize leading-tight">Student Nexus</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTab} Node Control Console</p>
           </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10 relative">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 z-10 ${
                        activeTab === tab.id 
                        ? 'text-white' 
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                    <tab.icon size={16} />
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
      </div>

      <main className="p-8 pb-20">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {activeTab === 'academic' && <AcademicDashboard />}
                {activeTab === 'hostel' && <HostelDashboard />}
                {activeTab === 'lms' && <LMSDashboard />}
            </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Status Footer */}
      <footer className="fixed bottom-0 left-0 lg:left-[280px] right-0 pb-6 pointer-events-none z-50">
          <div className="max-w-4xl mx-auto px-6 h-14 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-enterprise flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Academic Session</span>
                 </div>
                 <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
                 <div className="flex items-center gap-2">
                    <Zap className="text-amber-500" size={14} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">12 Active Courses</span>
                 </div>
              </div>
              <Badge variant="primary" className="py-1 px-3">ERP NEXUS 4.0</Badge>
          </div>
      </footer>
    </div>
  );
};

export default StudentPage;