import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  TrendingUp, 
  Award, 
  ChevronRight,
  Monitor,
  Activity,
  Zap,
  Library,
  User,
  MapPin,
  CreditCard,
  Target,
  Users,
  Flame,
  Search,
  Clock,
  Phone
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import ProfileSummary from '../components/student/academic/ProfileSummary.jsx';
import CourseRegistration from '../components/student/academic/CourseRegistration.jsx';
import Timetable from '../components/student/academic/Timetable.jsx';
import Attendance from '../components/student/academic/Attendance.jsx';
import Results from '../components/student/academic/Results.jsx';
import Fees from '../components/student/academic/Fees.jsx';
import Notifications from '../components/student/academic/Notifications.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

const AcademicPage = () => {
  const { studentProfile } = useContext(DataContext);
  const s = studentProfile || {};

  const stats = [
      { label: 'Cumulative CGPA', val: s.cgpa || '3.82', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
      { label: 'Pending Fee Node', val: s.pendingFee || '₹12,400', icon: CreditCard, color: 'text-error', bg: 'bg-error/10' },
      { label: 'Batch & Program', val: `${s.batch || '2022'} • ${s.course || 'B.Tech'}`, icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
      { label: 'Credit Synthesis', val: `${s.creditsObtained || '65'} / ${s.totalCredits || '160'}`, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-secondary-dark p-4 sm:p-8 space-y-10 animate-in fade-in duration-700">
        
        {/* 1. Industrial Profile Hero Section (Styled like image) */}
        <Card className="bg-gradient-to-br from-white via-rose-50/40 to-white/95 backdrop-blur-3xl border border-rose-100 p-8 sm:p-12 rounded-[3.5rem] shadow-enterprise relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                {/* Profile Icon Node */}
                <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] bg-rose-100/50 border-4 border-primary/20 flex items-center justify-center text-primary shadow-glow shadow-primary/20 transition-transform duration-700 group-hover:scale-105">
                         <GraduationCap size={56} strokeWidth={1.5} className="drop-shadow-sm" />
                    </div>
                </div>

                {/* Identity Text Node */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 mb-4">
                        <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 tracking-tighter leading-tight italic">
                             {s.name || 'Deepak Kumar'}
                        </h1>
                        <Badge variant="primary" className="bg-success/5 text-success border border-success/10 uppercase tracking-[0.4em] text-[8px] px-4 py-1.5 rounded-full font-black">Active Node</Badge>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                             <User size={14} className="text-primary opacity-50" />
                             <span>{s.universityId || '2200030005'}</span>
                             <span className="opacity-20 px-1">•</span>
                             <span className="text-primary">{s.course || 'B.Tech'}</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none pt-4 border-t border-slate-100/50">
                             <div className="flex items-center gap-2">
                                 <MapPin size={12} className="text-slate-300" />
                                 <span>{s.hostelStatus || 'Day Scholar'}</span>
                             </div>
                             <div className="h-3 w-px bg-slate-100" />
                             <div className="flex items-center gap-2">
                                 <span>Semester {s.semester || '5'}</span>
                             </div>
                             <div className="h-3 w-px bg-slate-100" />
                             <div className="flex items-center gap-2 text-primary">
                                 <Flame size={12} />
                                 <span>Intelligence Score: 98%</span>
                             </div>
                             <div className="h-3 w-px bg-slate-100" />
                             <div className="flex items-center gap-2">
                                 <Phone size={12} />
                                 <span>Verified Node</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Structural Detail Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
            
            {/* Background Branding Elements */}
            <Library size={400} className="absolute -right-20 -bottom-20 text-primary/5 -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-1000" />
        </Card>

        {/* 2. Analytical Intelligence Row (4 Containers in a line) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
                <Card key={idx} className="bg-white/80 backdrop-blur-3xl border border-rose-100 p-8 rounded-[2.5rem] shadow-soft hover:shadow-glass hover:shadow-primary/5 transition-all group relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                            <item.icon size={22} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{item.label}</p>
                        <h4 className="text-2xl font-display font-black text-slate-900 leading-none">{item.val}</h4>
                    </div>
                </Card>
            ))}
        </section>

        {/* 3. Primary Academic Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
                 <CourseRegistration />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Timetable />
                    <Attendance />
                 </div>
                 
                 {/* Advanced Credit Architecture */}
                 <Card className="bg-white/80 backdrop-blur-3xl border border-rose-100 p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-display font-black text-slate-900 italic tracking-tight">Credit <span className="text-primary">Synthesis</span> Hub</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Multi-Departmental Requirement Mapping</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">Global Status: Optimal</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {[
                                { label: 'Core Engineering', p: 85, c: 'bg-primary' },
                                { label: 'Inquiry & Humanities', p: 100, c: 'bg-indigo-500' },
                                { label: 'Professional Skills', p: 65, c: 'bg-amber-500' },
                                { label: 'Open Electives', p: 40, c: 'bg-rose-500' }
                            ].map((cr, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{cr.label}</span>
                                        <span className="text-xs font-black text-slate-900">{cr.p}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${cr.p}%` }} className={`h-full ${cr.c}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-center text-center">
                            <TrendingUp className="mx-auto text-primary mb-4" size={40} />
                            <h4 className="text-xl font-display font-black text-slate-900">Nodal Velocity: 1.4</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{`Degree Finalization Estimated: May 2026`}</p>
                        </div>
                    </div>
                 </Card>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-8">
                 <Notifications />
                 <Results />
                 
                 {/* Institutional Arrear Registry */}
                 <Card className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-glass shadow-primary/20 relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-rose-500 shadow-glow shadow-rose-500/20">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-black italic tracking-tighter text-white">Arrear <span className="text-rose-500">Registry</span></h4>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nodal Backlog Monitoring</p>
                            </div>
                        </div>

                        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center flex flex-col items-center">
                             <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
                             <p className="text-sm font-black text-white italic">Node Clear: 0 Pending</p>
                             <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter mt-1">Institutional Honor Roll</p>
                        </div>
                    </div>
                 </Card>
                 
                 <Fees />
                 
                 {/* High Authority Connect */}
                 <Card className="bg-primary text-white p-8 rounded-[2.5rem] shadow-glow shadow-primary/30 text-center relative overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="relative z-10 flex flex-col items-center">
                        <Users size={32} fill="currentColor" />
                        <h4 className="mt-4 text-xl font-display font-black italic">Institutional <span className="text-slate-900">Mentorship</span></h4>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Connect with HOD Node Now</p>
                    </div>
                    <Zap size={180} className="absolute -right-10 -bottom-10 text-white/5 pointer-events-none" />
                 </Card>
            </div>
        </div>

    </div>
  );
};

export default AcademicPage;
