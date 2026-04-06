import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Zap, CreditCard } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';
import { DataContext } from '../../../context/DataContext.jsx';

const KPICards = () => {
    const { studentProfile, loading } = useContext(DataContext);

    const profile = studentProfile || {};
    const cgpa = profile.cgpa ? Number(profile.cgpa).toFixed(2) : '—';
    const attendance = profile.attendancePercent ? `${Number(profile.attendancePercent).toFixed(1)}%` : '—';
    const semester = profile.semester || '—';
    const course = profile.course || 'B.Tech';

    const kpiData = [
        { label: 'CGPA', value: cgpa, icon: Award, color: 'text-primary', sub: 'Cumulative Grade Point' },
        { label: 'Attendance', value: attendance, icon: Zap, color: Number(profile.attendancePercent) >= 75 ? 'text-success' : 'text-error', sub: Number(profile.attendancePercent) >= 75 ? 'Within Mandate' : 'Below 75% Alert' },
        { label: 'Pending Fees', value: '₹0', icon: CreditCard, color: 'text-success', sub: 'All dues cleared' },
        { label: 'Current Sem', value: semester, icon: Calendar, color: 'text-amber-500', sub: course }
    ];

    if (loading) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1,2,3,4].map(i => (
                <div key={i} className="h-32 rounded-3xl bg-white/10 animate-pulse" />
            ))}
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Card className="p-6 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl hover:translate-y-[-5px] transition-all duration-300 relative group overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 ${kpi.color}`}>
                                <kpi.icon size={20} />
                            </div>
                            <Badge variant="primary" className="bg-primary/5 text-primary border-none uppercase text-[8px] tracking-[.3em] font-bold">{kpi.label}</Badge>
                        </div>
                        <h3 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-1 group-hover:scale-105 transition-transform origin-left">{kpi.value}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.sub}</p>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default KPICards;
