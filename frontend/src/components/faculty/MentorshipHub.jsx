import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, ShieldCheck, Mail, Phone, ArrowRight } from 'lucide-react';
import { DataContext } from '../../context/DataContext.jsx';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const MentorshipHub = () => {
    const { users } = useContext(DataContext);
    const mentees = users.filter(u => u.role === 'student' && u.batch === '2024-2028');

    return (
        <div className="space-y-8 animate-fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentees.map((mentee, i) => (
                    <Card key={mentee.email} className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group hover:translate-y-[-5px] transition-all duration-500">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                 <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-2xl border border-primary/20 shadow-lg shadow-primary/5 group-hover:scale-110 transition-transform">
                                     {mentee.name.charAt(0)}
                                 </div>
                                 <Badge variant="primary" className="bg-success/10 text-success border-success/20 py-1.5 px-4 rounded-full text-[9px] tracking-widest uppercase">Node Synchronized</Badge>
                            </div>
                            
                            <h4 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-1">{mentee.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{mentee.universityId} • {mentee.course}</p>
                            
                            <div className="space-y-3 mb-8 pb-6 border-b border-slate-100 dark:border-white/5">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance Hub</span>
                                    <span className="text-sm font-bold text-success">92.4%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CGPA Node</span>
                                    <span className="text-sm font-bold text-primary">8.84</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button className="flex-1 py-3 text-[9px] uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none shadow-xl"><MessageSquare size={14} className="mr-2" /> Message</Button>
                                <Button variant="secondary" className="w-12 h-12 rounded-xl p-0 flex items-center justify-center"><Phone size={16} /></Button>
                            </div>
                        </div>
                        
                        {/* Iridescent background decoration */}
                        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
                    </Card>
                ))}
            </div>
            
            <Card className="p-12 bg-slate-900 border-none shadow-glass rounded-[4rem] text-white overflow-hidden group relative">
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform shadow-2xl">
                        <TrendingUp size={32} className="text-primary" />
                    </div>
                    <h3 className="text-4xl font-display font-bold tracking-tight mb-4 text-white">Global Mentorship Analytics node</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-10 italic">Analyze cross-nodal academic performance trends for institutional peer-review and instruction optimization.</p>
                    <Button className="py-4 px-10 text-[10px] uppercase tracking-[0.3em] shadow-2xl group/btn">
                        Activate Analytics Node <ArrowRight size={16} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
                <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
            </Card>
        </div>
    );
};

export default MentorshipHub;
