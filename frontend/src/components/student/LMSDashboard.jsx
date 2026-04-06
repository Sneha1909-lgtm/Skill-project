import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Globe, 
  Library, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Trophy,
  Activity,
  Zap,
  Calendar as CalendarIcon,
  Clock,
  Youtube,
  GraduationCap
} from 'lucide-react';
import { DataContext } from '../../context/DataContext.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

const LMSDashboard = () => {
    const { studentProfile } = useContext(DataContext);
    const course = studentProfile?.course || 'No Program Registered';

    const analysisData = [
        { label: 'Course Progress', value: '78%', icon: GraduationCap, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Quiz Analytics', value: '92/100', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Live Sessions', value: '14/15', icon: Youtube, color: 'text-success', bg: 'bg-success/10' }
    ];

    const deadlines = [
        { id: 1, task: 'Cloud Architecture Assignment', date: 'Oct 28', status: 'Urgent', color: 'bg-error/20 text-error border-error/20' },
        { id: 2, task: 'Algorithms Quiz #4', date: 'Oct 30', status: 'Upcoming', color: 'bg-amber-500/20 text-amber-600 border-amber-500/20' },
        { id: 3, task: 'System Design Peer Review', date: 'Nov 02', status: 'Next Week', color: 'bg-primary/20 text-primary border-primary/20' }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-44 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* 1. Intelligence Analysis Layer */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analysisData.map((item, idx) => (
                    <Card key={idx} className="bg-gradient-to-br from-white/90 via-rose-50/40 to-white/90 backdrop-blur-3xl border border-primary/10 p-6 rounded-[2.5rem] shadow-soft hover:shadow-glass hover:shadow-primary/5 transition-all group relative overflow-hidden">
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-1">{item.label}</p>
                                <h4 className="text-3xl font-display font-black text-slate-900">{item.value}</h4>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shadow-inner`}>
                                <item.icon size={24} />
                            </div>
                        </div>
                        {/* Subtle background glow */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    </Card>
                ))}
            </section>

            {/* 2. Registered Course Hero */}
            <section>
                <Card className="bg-gradient-to-br from-white/95 via-rose-50/60 to-white/95 backdrop-blur-3xl border border-primary/20 p-10 rounded-[3rem] shadow-glass relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/5">
                            <Monitor size={56} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <Badge variant="primary" className="mb-4 bg-primary/20 text-primary border-primary/20 uppercase tracking-widest text-[10px]">Institutional Path Enrolled</Badge>
                            <h2 className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
                                {course}
                            </h2>
                            <p className="text-slate-500 font-medium mt-2 max-w-xl italic">
                                Learning Analytics: Synchronized with the 2026 Academic Kernel.
                            </p>
                        </div>
                    </div>
                    <Globe size={400} className="absolute -right-20 -bottom-20 text-primary/5 -rotate-12 group-hover:rotate-12 transition-transform duration-1000" />
                </Card>
            </section>

            {/* 3. Academic Timeline & Progress Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visual Calendar / Deadlines */}
                <Card className="lg:col-span-8 bg-white/70 backdrop-blur-2xl border border-slate-100 p-8 rounded-[2.5rem] shadow-enterprise relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h3 className="text-2xl font-display font-bold text-slate-900">Academic Timeline</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Assignment Sync Nodes</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400">
                             <CalendarIcon size={20} />
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {deadlines.map(deadline => (
                            <div key={deadline.id} className="flex items-center justify-between p-6 rounded-[2rem] bg-white border border-slate-50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="text-center min-w-[60px] p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">OCT</p>
                                        <p className="text-xl font-display font-black text-slate-900 group-hover:text-primary transition-colors">{deadline.date.split(' ')[1]}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">{deadline.task}</h4>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <Clock size={12} className="text-slate-400" />
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submissions Close 11:59 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${deadline.color}`}>
                                    {deadline.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Progress Visualizer */}
                <Card className="lg:col-span-4 bg-gradient-to-br from-primary to-primary-dark p-8 rounded-[2.5rem] text-white shadow-glass relative overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <Badge className="bg-white/20 text-white border-none py-1 px-3">Live Analysis</Badge>
                            <Activity size={24} className="text-white/40 animate-pulse" />
                        </div>
                        <h3 className="text-3xl font-display font-bold leading-tight mb-6">Learning Momentum</h3>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70">
                                    <span>Knowledge Retention</span>
                                    <span>84%</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '84%' }}
                                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70">
                                    <span>Sync Consistency</span>
                                    <span>96%</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '96%' }}
                                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-white/10">
                        <Button className="w-full bg-white text-primary hover:bg-white/90 border-none py-4 text-[10px] uppercase tracking-widest font-black shadow-lg shadow-black/20 group/btn">
                             Verify Academic Node <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <Library size={300} className="absolute -right-20 -bottom-20 text-white/5 -rotate-12 opacity-50" />
                </Card>
            </div>
        </div>
    );
};

export default LMSDashboard;
