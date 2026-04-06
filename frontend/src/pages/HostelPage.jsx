import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  MapPin, 
  Coffee, 
  ShieldCheck, 
  Users, 
  ChevronRight,
  TrendingUp,
  Activity,
  Zap,
  Library,
  Wind
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import HostelOverview from '../components/student/hostel/HostelOverview.jsx';
import RoomDetails from '../components/student/hostel/RoomDetails.jsx';
import Roommates from '../components/student/hostel/Roommates.jsx';
import HostelFees from '../components/student/hostel/HostelFees.jsx';
import MessDetails from '../components/student/hostel/MessDetails.jsx';
import MessMenu from '../components/student/hostel/MessMenu.jsx';
import ComplaintSystem from '../components/student/hostel/ComplaintSystem.jsx';
import LeaveRequest from '../components/student/hostel/LeaveRequest.jsx';
import WardenInfo from '../components/student/hostel/WardenInfo.jsx';
import HostelNotifications from '../components/student/hostel/HostelNotifications.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

const HostelPage = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-secondary-dark p-4 sm:p-8 space-y-10 animate-in fade-in duration-700">
        {/* 1. Hostel Hero Node */}
        <Card className="bg-gradient-to-br from-white/95 via-rose-50/70 to-white/95 backdrop-blur-3xl border border-primary/20 p-10 rounded-[3rem] shadow-glass relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/5">
                    <Home size={56} strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <Badge variant="primary" className="bg-primary/20 text-primary border-primary/20 uppercase tracking-[0.4em] text-[8px] px-3 py-1">Residential Node</Badge>
                        <span className="text-[8px] font-bold text-success/80 uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-sm px-2 py-1 rounded-full border border-success/10 bg-success/5">
                            <Activity size={10} /> Syncing Facilities
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 tracking-tighter leading-none mb-2">
                         Residential <span className="text-primary">Nexus</span>
                    </h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
                         KLU Residential Ecosystem <span className="opacity-20 px-2">|</span> Institutional Living
                    </p>
                </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <Wind size={400} className="absolute -right-20 -bottom-20 text-primary/5 -rotate-12 group-hover:rotate-12 transition-transform duration-1000" />
        </Card>

        {/* 2. Residential Overview Node */}
        <section>
            <div className="flex items-center gap-2 mb-6 pl-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Residential Status KPI</h3>
            </div>
            <HostelOverview />
        </section>

        {/* 3. Primary Residential Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
            <div className="lg:col-span-8 flex flex-col gap-8">
                <LeaveRequest />
                
                {/* Advanced Room Health Metrology */}
                <Card className="bg-white/80 backdrop-blur-3xl border border-rose-100 p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-display font-black text-slate-900 italic tracking-tight">Room <span className="text-primary">Health</span> Metrology</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Facility Sync Protocol</p>
                        </div>
                        <Badge variant="primary" className="bg-emerald-500/10 text-emerald-500 border-none px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">Amenities Active</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Wi-Fi Node', val: '85 Mbps', s: 'Synced', icon: Zap, c: 'text-indigo-500' },
                            { label: 'Power Flux', val: '240V', s: 'Stable', icon: Activity, c: 'text-rose-500' },
                            { label: 'Water Node', val: 'Active', s: 'Filtered', icon: Activity, c: 'text-blue-500' },
                            { label: 'Air Flow', val: 'Optimum', s: 'Active', icon: Wind, c: 'text-emerald-500' }
                        ].map((node, i) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-center group">
                                <div className={`w-10 h-10 mx-auto rounded-xl bg-white flex items-center justify-center mb-4 ${node.c} shadow-inner group-hover:scale-110 transition-transform`}>
                                    <node.icon size={20} />
                                </div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{node.label}</p>
                                <p className="text-lg font-display font-black text-slate-900 leading-none mb-1">{node.val}</p>
                                <p className="text-[8px] font-bold text-success uppercase tracking-widest">{node.s}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MessDetails />
                        <RoomDetails />
                </div>
                <MessMenu />
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
                <WardenInfo />
                
                {/* Strategic Dining Cluster */}
                <Card className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-glass shadow-primary/20 relative overflow-hidden group">
                     <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-500 shadow-glow shadow-amber-500/20">
                                <Coffee size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-black italic tracking-tighter text-white">Dining <span className="text-amber-500">Node</span> Sync</h4>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nodal Mess Engagement</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Breakfast', p: 92, c: 'bg-amber-500' },
                                { label: 'Lunch Flux', p: 45, c: 'bg-indigo-500' },
                                { label: 'High Tea', p: 10, c: 'bg-rose-500' }
                            ].map((m, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">{m.label}</span>
                                        <span className="text-xs font-black text-white">{m.p}% Entry</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${m.p}%` }} className={`h-full ${m.c}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                </Card>

                <ComplaintSystem />
                <Roommates />
                <HostelFees />
                <HostelNotifications />
            </div>
        </div>

    </div>
  );
};

export default HostelPage;
