import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, GraduationCap, Phone, Droplets } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';
import { DataContext } from '../../../context/DataContext.jsx';
import { AuthContext } from '../../../context/AuthContext.jsx';

const ProfileSummary = () => {
    const { studentProfile, loading } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    if (loading) return (
        <Card className="p-8 rounded-[2.5rem] animate-pulse">
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-[2rem] bg-white/10" />
                <div className="flex-1 space-y-3">
                    <div className="h-6 bg-white/10 rounded w-48" />
                    <div className="h-3 bg-white/10 rounded w-36" />
                </div>
            </div>
        </Card>
    );

    const profile = studentProfile || {};
    const displayName = profile.name || user?.username || 'Student';
    const univId = profile.universityId || '—';
    const course = profile.course || 'B.Tech';
    const branch = profile.branch || '';
    const semester = profile.semester || '—';
    const hostelStatus = profile.hostelStatus || 'Day Scholar';
    const roomNo = profile.roomNo || '—';
    const bloodGroup = profile.bloodGroup || '—';
    const phone = profile.phone || '—';

    return (
        <Link to="/profile" className="block transition-transform active:scale-95">
            <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-primary-dark p-1 shadow-glass group-hover:scale-105 transition-transform duration-500">
                        <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-dark/30 flex items-center justify-center">
                                <GraduationCap className="text-primary" size={40} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{String(displayName || 'Student')}</h2>
                            <Badge variant="primary" className="bg-success/10 text-success border-success/20 py-0.5 px-2 text-[8px] tracking-widest uppercase">Active Node</Badge>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <User size={12} className="text-primary" /> {String(univId)} • {String(course)} {String(branch)}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {String(hostelStatus === 'Hostler' ? roomNo : 'Day Scholar')}</span>
                            <span className="h-3 w-px bg-slate-200 dark:bg-white/10" />
                            <span>{String(semester)}</span>
                            <span className="h-3 w-px bg-slate-200 dark:bg-white/10" />
                            <span className="flex items-center gap-1"><Droplets size={12} className="text-red-400" /> {String(bloodGroup)}</span>
                            <span className="h-3 w-px bg-slate-200 dark:bg-white/10" />
                            <span className="flex items-center gap-1"><Phone size={12} /> {String(phone)}</span>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
        </Link>
    );
};

export default ProfileSummary;
