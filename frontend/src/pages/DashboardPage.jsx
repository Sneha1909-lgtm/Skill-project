import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    Home, 
    Library, 
    GraduationCap, 
    ArrowRight, 
    Activity, 
    ShieldCheck, 
    Zap,
    Clock,
    User,
    BarChart3,
    PieChart,
    Microscope,
    Flame
} from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';

const DashboardPage = () => {
  const { user, role, name } = useContext(AuthContext);

  const academicAnalysis = [
      { label: 'Attendance Sync', value: '92%', progress: 92, color: 'bg-primary' },
      { label: 'GPA Momentum', value: '3.82', progress: 85, color: 'bg-indigo-500' },
      { label: 'Credit Velocity', value: '18/24', progress: 75, color: 'bg-success' }
  ];

  const lmsAnalysis = [
      { label: 'Course Mastery', value: '78%', progress: 78, color: 'bg-amber-500' },
      { label: 'Quiz Precision', value: '91%', progress: 91, color: 'bg-rose-500' },
      { label: 'Platform Engagement', value: 'Recent', progress: 100, color: 'bg-cyan-500' }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-secondary-dark p-4 sm:p-8 space-y-10 animate-in fade-in duration-700">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Node: <span className="text-primary">{name || 'Operator'}</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mt-1 italic">
             Institutional Cognitive Analysis <span className="opacity-20 px-2">|</span> ID: 2200030005
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-2xl border border-rose-100 p-2 rounded-2xl shadow-soft">
           <Badge variant="primary" className="bg-primary/20 text-primary uppercase text-[8px] tracking-widest font-black py-1.5 px-4 rounded-xl border border-primary/20">Active Node</Badge>
           <div className="pr-4 flex items-center gap-2 text-slate-500">
               <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest">Network Synchronized</span>
           </div>
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Academic Intelligence Analysis */}
          <Card className="bg-gradient-to-br from-white via-rose-50/40 to-white/90 backdrop-blur-3xl border border-rose-100 p-10 rounded-[3rem] shadow-enterprise relative overflow-hidden group">
              <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                              <BarChart3 size={24} />
                          </div>
                          <div>
                              <h3 className="text-2xl font-display font-bold text-slate-900">Academic Analytics</h3>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Cross-Semester Knowledge Flux</p>
                          </div>
                      </div>
                      <Link to="/academic" className="p-3 bg-white/50 rounded-2xl text-slate-300 hover:text-primary transition-all border border-slate-100">
                          <ArrowRight size={20} />
                      </Link>
                  </div>

                  <div className="space-y-10">
                      {academicAnalysis.map((item, idx) => (
                          <div key={idx}>
                              <div className="flex justify-between items-end mb-3">
                                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.label}</span>
                                  <span className="text-sm font-display font-black text-slate-900">{item.value}</span>
                              </div>
                              <div className="h-3 w-full bg-slate-100/50 rounded-full overflow-hidden border border-slate-200/50">
                                  <motion.div 
                                      initial={{ width: 0 }} 
                                      animate={{ width: `${item.progress}%` }} 
                                      className={`h-full ${item.color} shadow-lg shadow-black/5`} 
                                  />
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="mt-14 p-6 bg-white/40 border border-dashed border-rose-200 rounded-[2rem] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                           <Microscope className="text-primary opacity-30" size={24} />
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                               Cumulative Performance Node: <br /> <span className="text-slate-900 text-xs">Scholar Elite Tier</span>
                           </p>
                      </div>
                      <Badge className="bg-success text-white py-1 px-4 text-[8px] font-black shadow-lg shadow-success/20">SYNCED</Badge>
                  </div>
              </div>
              <GraduationCap size={300} className="absolute -right-20 -bottom-20 text-primary/5 -rotate-12 pointer-events-none" />
          </Card>

          {/* LMS Engagement Analysis */}
          <Card className="bg-gradient-to-br from-white via-rose-50/40 to-white/90 backdrop-blur-3xl border border-rose-100 p-10 rounded-[3rem] shadow-enterprise relative overflow-hidden group">
              <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
                              <PieChart size={24} />
                          </div>
                          <div>
                              <h3 className="text-2xl font-display font-bold text-slate-900">LMS Cognitive Sync</h3>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Resource + Engagement Vectors</p>
                          </div>
                      </div>
                      <Link to="/lms" className="p-3 bg-white/50 rounded-2xl text-slate-300 hover:text-amber-500 transition-all border border-slate-100">
                          <ArrowRight size={20} />
                      </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-10">
                      <div className="flex flex-col items-center justify-center p-8 bg-amber-500/[0.03] rounded-[2.5rem] border border-amber-500/[0.08]">
                           <TrendingUp className="text-amber-500 mb-4" size={32} />
                           <p className="text-4xl font-display font-black text-slate-900">96.4</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Knowledge IQ</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-8 bg-primary/[0.03] rounded-[2.5rem] border border-primary/[0.08]">
                           <Flame className="text-primary mb-4 animate-pulse" size={32} />
                           <p className="text-4xl font-display font-black text-slate-900">12D</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Streak</p>
                      </div>
                  </div>

                  <div className="space-y-8">
                       {lmsAnalysis.map((item, idx) => (
                           <div key={idx} className="group/item">
                               <div className="flex justify-between items-center mb-2">
                                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover/item:text-primary transition-colors">{item.label}</span>
                                   <Badge className={`${item.color} text-white text-[8px] py-1 px-3 border-none shadow-md`}>{item.value}</Badge>
                               </div>
                               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                                   <motion.div initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
                               </div>
                           </div>
                       ))}
                  </div>
              </div>
              <Library size={300} className="absolute -right-20 -bottom-20 text-primary/5 -rotate-12 pointer-events-none" />
          </Card>
      </div>

      {/* Middle Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
               { icon: Home, label: 'Hostel Module', path: '/hostel', val: 'Room 302B', detail: 'Facilities Active', color: 'rose' },
               { icon: Activity, label: 'Health Status', path: '/profile', val: 'Optimum', detail: 'Reflects Nodal Balance', color: 'blue' },
               { icon: User, label: 'Identity Node', path: '/profile', val: 'Profile Synced', detail: 'Metadata Encrypted', color: 'primary' }
           ].map((mod, idx) => (
               <Link key={idx} to={mod.path}>
                   <Card className="p-8 bg-white/70 backdrop-blur-xl border border-rose-50 rounded-[2.5rem] shadow-soft hover:shadow-glass hover:shadow-primary/5 transition-all group relative overflow-hidden">
                       <div className="relative z-10 flex items-center gap-5">
                           <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-slate-100">
                               <mod.icon size={22} />
                           </div>
                           <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mod.label}</p>
                               <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{mod.val}</h4>
                               <p className="text-[9px] text-slate-500 mt-0.5 font-medium">{mod.detail}</p>
                           </div>
                       </div>
                       <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none" />
                   </Card>
               </Link>
           ))}
      </div>

      {/* Advanced Cognitive Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Skill Radar Mockup */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-3xl border border-rose-100 p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                  <div>
                      <h3 className="text-2xl font-display font-black text-slate-900 italic tracking-tight">Skill <span className="text-primary">Architecture</span></h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Multi-Dimensional Capability Mapping</p>
                  </div>
                  <Badge variant="primary" className="bg-indigo-500/10 text-indigo-500 border-none px-4 py-1.5 text-[9px] font-black uppercase tracking-widest">Level 4 Active</Badge>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                      { label: 'Cloud Architecture', val: 'Advanced', p: 88, c: 'bg-primary' },
                      { label: 'Neural Logic', val: 'Expert', p: 94, c: 'bg-indigo-500' },
                      { label: 'Cyber Sentinel', val: 'Practitioner', p: 72, c: 'bg-amber-500' },
                      { label: 'Data Mining', val: 'Advanced', p: 85, c: 'bg-rose-500' },
                      { label: 'Quantum Basics', val: 'Elementary', p: 40, c: 'bg-emerald-500' },
                      { label: 'Soft Protocols', val: 'Master', p: 98, c: 'bg-cyan-500' },
                      { label: 'Global Ethics', val: 'Advanced', p: 82, c: 'bg-indigo-600' },
                      { label: 'Strategic Ops', val: 'Intermediate', p: 65, c: 'bg-slate-800' }
                  ].map((s, idx) => (
                      <div key={idx} className="p-5 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/10 hover:border-primary/20 transition-all group">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 truncate group-hover:text-primary transition-colors">{s.label}</p>
                          <div className="flex items-end justify-between gap-2 mb-2">
                              <span className="text-sm font-black text-slate-900 truncate">{s.val}</span>
                              <span className="text-[8px] font-bold text-slate-400">{s.p}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white dark:bg-white/10 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${s.p}%` }} className={`h-full ${s.c}`} />
                          </div>
                      </div>
                  ))}
              </div>
          </Card>

          {/* Placement Preparedness */}
          <Card className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-glass shadow-primary/20 relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-glow shadow-primary/30">
                           <Zap size={24} fill="currentColor" />
                       </div>
                       <div>
                           <h4 className="text-xl font-display font-black italic tracking-tighter">Placement <span className="text-primary">Readiness</span></h4>
                           <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nodal Career Sync Protocol</p>
                       </div>
                  </div>

                  <div className="relative w-48 h-48 mx-auto mb-10">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                          <motion.circle 
                              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                              strokeDasharray="283" 
                              initial={{ strokeDashoffset: 283 }}
                              animate={{ strokeDashoffset: 283 - (283 * 0.85) }}
                              transition={{ duration: 2, ease: "easeOut" }}
                              className="text-primary" 
                          />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-display font-black italic">85<span className="text-primary font-sans text-2xl">%</span></span>
                          <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em] mt-1">Tier-1 Ready</span>
                      </div>
                  </div>

                  <div className="space-y-4">
                      {[
                        { label: 'Technical Rounds', status: 'Authorized', color: 'text-emerald-500' },
                        { label: 'Aptitude Modules', status: 'Pending', color: 'text-amber-500' },
                        { label: 'Portfolio Sync', status: 'Active', color: 'text-primary' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{item.label}</span>
                            <span className={`text-[10px] font-black uppercase tracking-tighter ${item.color}`}>{item.status}</span>
                        </div>
                      ))}
                  </div>
              </div>
              <Flame size={240} className="absolute -right-20 -bottom-20 text-white/5 pointer-events-none" />
          </Card>
      </div>

    </div>
  );
};

export default DashboardPage;