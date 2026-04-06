import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Library, ArrowRight, Activity, Zap, Clock,
    Upload, MessageCircle, ShieldCheck, Send, FileText,
    ChevronRight, ChevronDown, FileUp, Target, Trophy, History, Layout, Globe, LayoutList, GraduationCap, Edit3
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import { toast } from 'sonner';
import api from '../services/api.js';

const LMSPage = () => {
    const { studentProfile, subjects = [], quizzes = [] } = useContext(DataContext);
    const [activeSection, setActiveSection] = useState('overview');

    const [vaultLevel, setVaultLevel] = useState('subjects');
    const [activeSubject, setActiveSubject] = useState(null);
    const [activeAssignment, setActiveAssignment] = useState(null);
    const [subjectAssignments, setSubjectAssignments] = useState([]);
    const [submissionFile, setSubmissionFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedQuerySubject, setSelectedQuerySubject] = useState('');
    const [queryText, setQueryText] = useState('');
    const [isSendingQuery, setIsSendingQuery] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const fullCourseCatalog = [
        { id: 1, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "22UC0021", courseDesc: "SOCIAL IMMERSIVE LEARNING", ltps: "S", section: "S-8", facultyName: "Sumit Sen" },
        { id: 2, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "23EC1202", courseDesc: "DIGITAL DESIGN AND COMPUTER ARCHITECTURE", ltps: "L", section: "S-6", facultyName: "Venkata Durga Prasad Mareedu" },
        { id: 3, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "23EC1202", courseDesc: "DIGITAL DESIGN AND COMPUTER ARCHITECTURE", ltps: "P", section: "S-6", facultyName: "Agilesh Saravanan R" },
        { id: 4, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "23EC1203", courseDesc: "BASIC ELECTRICAL AND ELECTRONIC CIRCUITS", ltps: "L", section: "S-8", facultyName: "TAMMINENI SREELATHA" },
        { id: 5, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "23FL3058", courseDesc: "JAPANESE LANGUAGE", ltps: "L", section: "S-201", facultyName: "irfan mohammed" },
        { id: 6, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "23ME1103", courseDesc: "DESIGN TOOL WORKSHOP", ltps: "P", section: "S-8", facultyName: "Munish Kumar" },
        { id: 7, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "23MT1001", courseDesc: "LINEAR ALGEBRA & CALCULUS FOR ENGINEERS", ltps: "L", section: "S-5", facultyName: "Appa Rao Venkata Bhogapurapu" },
        { id: 8, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "23MT1001", courseDesc: "LINEAR ALGEBRA & CALCULUS FOR ENGINEERS", ltps: "T", section: "S-5", facultyName: "AYYALAPPAGARI SREENIVASULU" },
        { id: 9, year: 1, academicYear: "2024-2025", semester: "Odd Sem", courseCode: "23SC1101", courseDesc: "COMPUTATIONAL THINKING FOR STRUCTURED DESIGN", ltps: "L", section: "S-26", facultyName: "Madupu Ram Kumar" },
        { id: 10, year: 1, academicYear: "2024-2025", semester: "Odd Sem", courseCode: "23SC1101", courseDesc: "COMPUTATIONAL THINKING FOR STRUCTURED DESIGN", ltps: "P", section: "S-26", facultyName: "Inakollu Aswani" },
        { id: 11, year: 1, academicYear: "2024-2025", semester: "Odd Sem", courseCode: "23SC1101", courseDesc: "COMPUTATIONAL THINKING FOR STRUCTURED DESIGN", ltps: "S", section: "S-26", facultyName: "Dama Anand" },
        { id: 12, year: 1, academicYear: "2024-2025", semester: "Even Sem", courseCode: "23UC0008", courseDesc: "INDIAN CONSTITUTION", ltps: "L", section: "S-5", facultyName: "Moutushi Thakur" },
        { id: 13, year: 1, academicYear: "2024-2025", semester: "Odd Sem", courseCode: "23UC0026", courseDesc: "HUMAN VALUES, GENDER EQUALITY AND PROFESSIONAL ETHICS", ltps: "L", section: "S-28", facultyName: "goli balavenkata kishore" },
        { id: 14, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24AD2001", courseDesc: "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING", ltps: "L", section: "S-218", facultyName: "MANEESHA VADDURI" },
        { id: 15, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24AD2001", courseDesc: "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING", ltps: "P", section: "S-218", facultyName: "DINESH CHANDRA PANCHARIA" },
        { id: 16, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24AD2103", courseDesc: "DATABASE MANAGEMENT SYSTEMS", ltps: "L", section: "S-201", facultyName: "Kallipalli Venkata Raju" },
        { id: 17, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24AD2103", courseDesc: "DATABASE MANAGEMENT SYSTEMS", ltps: "P", section: "S-201", facultyName: "Ratna Kanth Nelapati" },
        { id: 18, year: 2, academicYear: "2025-2026", semester: "Even Sem", courseCode: "24CC3010", courseDesc: "AWS CERTIFIED CLOUD PRACTITIONER", ltps: "S", section: "S-59", facultyName: "Swetha Pendem" },
        { id: 19, year: 2, academicYear: "2025-2026", semester: "Even Sem", courseCode: "24CS2101", courseDesc: "OPERATING SYSTEMS", ltps: "L", section: "S-57", facultyName: "Kodanda Rama Krishna Rao Tirumala" },
        { id: 20, year: 2, academicYear: "2025-2026", semester: "Even Sem", courseCode: "24CS2101", courseDesc: "OPERATING SYSTEMS", ltps: "P", section: "S-57", facultyName: "SETTI RAJESWARI" },
        { id: 21, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24CS2202", courseDesc: "DESIGN AND ANALYSIS OF ALGORITHMS", ltps: "L", section: "S-201", facultyName: "Dr. Sumit Sen" },
        { id: 22, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24CS2202", courseDesc: "DESIGN AND ANALYSIS OF ALGORITHMS", ltps: "P", section: "S-201", facultyName: "Agilesh Saravanan R" },
        { id: 23, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24CS2205", courseDesc: "COMPUTER NETWORKS", ltps: "L", section: "S-201", facultyName: "Dama Anand" },
        { id: 24, year: 2, academicYear: "2025-2026", semester: "Odd Sem", courseCode: "24CS2205", courseDesc: "COMPUTER NETWORKS", ltps: "P", section: "S-201", facultyName: "Munish Kumar" },
        { id: 25, year: 3, academicYear: "2026-2027", semester: "Odd Sem", courseCode: "24CS3103", courseDesc: "CRYPTOGRAPHY AND NETWORK SECURITY", ltps: "L", section: "S-305", facultyName: "Venkata Durga Prasad Mareedu" },
        { id: 26, year: 3, academicYear: "2026-2027", semester: "Odd Sem", courseCode: "24CS3103", courseDesc: "CRYPTOGRAPHY AND NETWORK SECURITY", ltps: "P", section: "S-305", facultyName: "Sumit Sen" }
    ];

    const courseName = studentProfile?.course || 'CS & IT Intelligence';

    const fetchAssignments = async (subject) => {
        try {
            const res = await api.get(`/api/assignments/subject/${subject.id}`);
            setSubjectAssignments(res.data);
            setActiveSubject(subject);
            setVaultLevel('list');
        } catch {
            toast.error('Sync Failed', { description: 'Unable to reach assignment node.' });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSubmissionFile(reader.result);
                toast.success('File Ready', { description: `${file.name} is queued for transmission.` });
            };
        }
    };

    const handleSubmitAssignment = async (e) => {
        e.preventDefault();
        if (!submissionFile) { toast.error('No file selected'); return; }
        setIsSubmitting(true);
        try {
            await api.post('/api/assignments/submit', { assignmentId: activeAssignment.id, file: submissionFile });
            toast.success('Submitted!', { description: 'Assignment saved to institutional vault.' });
            setVaultLevel('list');
            setSubmissionFile(null);
        } catch {
            toast.error('Submission Failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleQuerySubmit = (e) => {
        e.preventDefault();
        if (!selectedQuerySubject || !queryText) { toast.error('Fill all fields'); return; }
        setIsSendingQuery(true);
        setTimeout(() => {
            toast.success('Inquiry Sent', { description: 'Faculty node notified.' });
            setQueryText('');
            setIsSendingQuery(false);
        }, 1500);
    };

    const navItems = [
        { id: 'overview', label: 'Insight Node', sub: 'Analytics', icon: Activity },
        { id: 'details', label: 'Course Catalog', sub: 'Curriculum', icon: LayoutList },
        { id: 'assignments', label: 'Assignment Vault', sub: 'Submissions', icon: Upload },
        { id: 'quizzes', label: 'Quiz Arena', sub: 'Simulations', icon: Zap },
        { id: 'queries', label: 'Faculty Query', sub: 'Institutional', icon: MessageCircle }
    ];

    const analytics = [
        { label: 'Cloud Architecture', score: 88, color: 'bg-rose-500' },
        { label: 'Neural Protocols', score: 76, color: 'bg-amber-500' },
        { label: 'System Logic', score: 92, color: 'bg-emerald-500' }
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-secondary-dark p-4 sm:p-8 space-y-8 animate-in fade-in duration-700">

            {/* ── HERO HEADER ─────────────────────────────────── */}
            <Card className="bg-gradient-to-br from-white via-rose-50/40 to-white/90 backdrop-blur-3xl border border-rose-100 p-8 sm:p-12 rounded-[3.5rem] shadow-enterprise relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] bg-rose-100/50 border-4 border-primary/10 flex items-center justify-center text-primary shadow-glow shadow-primary/20 transition-transform duration-700 group-hover:scale-105">
                        <Library size={56} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <Badge variant="primary" className="bg-primary/10 text-primary border-primary/10 uppercase tracking-[0.4em] text-[8px] px-3 py-1.5 rounded-full font-black">LMS Intelligence</Badge>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 opacity-80">
                                <ShieldCheck size={12} /> Sync Active
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 tracking-tighter leading-none italic mb-2">
                            LMS <span className="text-primary">Nexus</span>
                        </h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
                            {courseName} <span className="opacity-20 px-2">|</span> ID: {studentProfile?.universityId || 'Syncing...'}
                        </p>
                    </div>
                </div>
                <Library size={400} className="absolute -right-20 -bottom-20 text-primary/5 -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-1000" />
            </Card>

            {/* ── NAV TILES ───────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {navItems.map(item => {
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`group relative flex flex-col items-start gap-3 p-5 sm:p-4 rounded-[1.8rem] border transition-all duration-500 text-left overflow-hidden ${isActive
                                    ? 'bg-primary border-primary shadow-glass shadow-primary/20 text-white'
                                    : 'bg-white dark:bg-slate-900 border-rose-100 dark:border-white/5 hover:border-primary/30 hover:shadow-lg'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/20 text-white' : 'bg-rose-50 dark:bg-white/5 text-primary group-hover:scale-110'
                                }`}>
                                <item.icon size={18} strokeWidth={2} />
                            </div>
                            <div>
                                <p className={`text-[8px] font-black uppercase tracking-[0.2em] leading-none mb-1.5 ${isActive ? 'text-white/60' : 'text-slate-400'}`}>{item.sub}</p>
                                <h4 className={`text-sm font-display font-black uppercase tracking-tight leading-none ${isActive ? 'text-white' : 'text-slate-800 dark:text-white'}`}>{item.label}</h4>
                            </div>
                            {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-full" />}
                        </button>
                    );
                })}
            </div>

            {/* ── SECTION CONTENT ─────────────────────────────── */}
            <AnimatePresence mode="wait">

                {/* 1. INSIGHT NODE */}
                {activeSection === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }} className="space-y-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Credits Earned', val: '64.5', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
                                { label: 'Assignments', val: '28', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
                                { label: 'Attendance', val: '94%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                                { label: 'GPA Node', val: '9.2', icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' }
                            ].map((item, i) => (
                                 <Card key={i} className="bg-white dark:bg-slate-900 border-rose-50 dark:border-white/5 p-8 rounded-[2.5rem] shadow-soft hover:shadow-enterprise transition-all group overflow-hidden relative">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            className="h-6 px-2 text-[8px] font-black uppercase tracking-[0.2em] bg-primary/5 hover:bg-primary/10 border-primary/10 text-primary rounded-lg"
                                            onClick={() => window.location.href = '/profile'}
                                        >
                                            <Edit3 size={10} className="mr-1" /> Edit Details
                                        </Button>
                                    </div>
                                    <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <item.icon size={22} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{item.label}</p>
                                    <h4 className="text-3xl font-display font-black text-slate-900 dark:text-white italic leading-none">{item.val}</h4>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <Card className="lg:col-span-8 bg-white dark:bg-slate-900 border-rose-50 dark:border-white/5 p-10 rounded-[3rem] shadow-enterprise">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white italic mb-1">Course Analytics</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Intelligence Sync</p>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-none px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest">Live</Badge>
                                </div>
                                <div className="space-y-8">
                                    {analytics.map((stat, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-[0.2em]">{stat.label}</span>
                                                <span className="text-xl font-display font-black text-primary italic">{stat.score}%</span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${stat.score}%` }} transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeOut' }} className={`h-full ${stat.color} rounded-full`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="lg:col-span-4 bg-gradient-to-br from-primary to-rose-600 p-10 rounded-[3rem] text-white shadow-glass shadow-primary/30 relative overflow-hidden flex flex-col justify-between border-none">
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center justify-between opacity-60">
                                        <Activity size={22} className="animate-pulse" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Realtime Flux</span>
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-display font-black italic tracking-tighter leading-tight mb-3">Cognitive Momentum</h4>
                                        <p className="text-rose-100 text-xs font-medium leading-relaxed">Strategic node active for <span className="text-white font-black">2026 Season.</span></p>
                                    </div>
                                    <div className="space-y-4">
                                        {[{ icon: Clock, label: 'Status', val: 'Node Stable' }, { icon: Layout, label: 'Environment', val: 'Cluster VII' }].map((s, i) => (
                                            <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                                                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><s.icon size={16} /></div>
                                                <div>
                                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-60">{s.label}</p>
                                                    <p className="text-xs font-black italic">{s.val}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Globe size={240} className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none" />
                            </Card>
                        </div>
                    </motion.div>
                )}

                {/* 2. ASSIGNMENT VAULT */}
                {activeSection === 'assignments' && (
                    <motion.div key="assignments" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-8">
                        <div className="flex items-center gap-3 px-2">
                            <button onClick={() => setVaultLevel('subjects')} className={`text-[10px] font-black uppercase tracking-widest transition-colors ${vaultLevel === 'subjects' ? 'text-primary' : 'text-slate-400 hover:text-slate-700'}`}>Vault Hub</button>
                            {activeSubject && (<><ChevronRight size={12} className="text-slate-300" /><button onClick={() => setVaultLevel('list')} className={`text-[10px] font-black uppercase tracking-widest ${vaultLevel !== 'subjects' ? 'text-primary' : 'text-slate-400'}`}>{activeSubject.name}</button></>)}
                            {vaultLevel === 'submit' && activeAssignment && (<><ChevronRight size={12} className="text-slate-300" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white">{activeAssignment.title}</span></>)}
                        </div>

                        {vaultLevel === 'subjects' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subjects.length === 0 && (
                                    <div className="col-span-full py-20 text-center opacity-30">
                                        <BookOpen size={48} className="mx-auto mb-4" />
                                        <p className="text-sm font-black uppercase tracking-widest">No Subject Nodes Found</p>
                                    </div>
                                )}
                                {subjects.map((sub, i) => (
                                    <Card key={i} onClick={() => fetchAssignments(sub)} className="bg-white dark:bg-slate-900 border-rose-50 dark:border-white/5 p-10 rounded-[3rem] cursor-pointer hover:shadow-enterprise hover:border-primary/20 transition-all duration-500 group">
                                        <div className="w-14 h-14 bg-primary/5 text-primary rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                                            <BookOpen size={28} />
                                        </div>
                                        <h4 className="text-xl font-display font-black text-slate-900 dark:text-white leading-tight italic mb-2">{sub.name}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-10">{sub.faculty || 'Faculty Sync Pending'}</p>
                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">Open Vault</span>
                                            <ArrowRight size={18} className="text-slate-200 dark:text-slate-700 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {vaultLevel === 'list' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {subjectAssignments.length === 0 && (
                                    <div className="col-span-full py-20 text-center opacity-30">
                                        <FileText size={48} className="mx-auto mb-4" />
                                        <p className="text-sm font-black uppercase tracking-widest">No Assignments in this Node</p>
                                    </div>
                                )}
                                {subjectAssignments.map((a, i) => (
                                    <Card key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-rose-50 dark:border-white/5 hover:border-primary/20 hover:shadow-enterprise transition-all group">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center"><FileText size={26} /></div>
                                            <Badge className="bg-amber-500/10 text-amber-600 border-none px-4 py-2 text-[8px] font-black tracking-widest uppercase rounded-xl">Pending</Badge>
                                        </div>
                                        <h4 className="text-2xl font-display font-black text-slate-900 dark:text-white italic leading-tight mb-3">{a.title}</h4>
                                        <p className="text-xs text-slate-400 font-medium italic leading-relaxed mb-8 line-clamp-2">{a.instructions}</p>
                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                                            <div className="flex items-center gap-5">
                                                <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Clock size={12} />{new Date(a.deadline).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest"><Target size={12} />{a.maxMarks} pts</span>
                                            </div>
                                            <Button size="sm" onClick={() => { setActiveAssignment(a); setVaultLevel('submit'); }} className="h-11 px-7 rounded-2xl text-[9px] font-black uppercase tracking-widest">Submit</Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {vaultLevel === 'submit' && activeAssignment && (
                            <div className="max-w-2xl mx-auto">
                                <Card className="bg-white dark:bg-slate-900 p-14 rounded-[4rem] border-rose-100 shadow-enterprise">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mb-8 shadow-glow shadow-primary/20">
                                            <FileUp size={38} />
                                        </div>
                                        <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic mb-2">{activeAssignment.title}</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Secure Submission Node</p>
                                        <form onSubmit={handleSubmitAssignment} className="w-full space-y-8">
                                            <div className="relative group cursor-pointer">
                                                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                <div className="h-52 border-2 border-dashed border-rose-100 rounded-[3rem] flex flex-col items-center justify-center bg-rose-50/20 transition-all group-hover:border-primary group-hover:bg-primary/5">
                                                    <Upload size={44} className="text-rose-200 group-hover:text-primary mb-4 transition-all group-hover:-translate-y-2" />
                                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                                                        {submissionFile ? '✓ File Ready' : 'Drop File or Click to Upload'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Button type="button" variant="ghost" onClick={() => setVaultLevel('list')} className="flex-1 h-16 rounded-[2rem] text-[10px] font-black uppercase tracking-widest border border-slate-100">Cancel</Button>
                                                <Button type="submit" isLoading={isSubmitting} className="flex-[2] h-16 rounded-[2rem] bg-slate-900 dark:bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] gap-3 shadow-xl">Transmit <Send size={16} /></Button>
                                            </div>
                                        </form>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* 2. COURSE CATALOG */}
                {activeSection === 'details' && (
                    <motion.div key="details" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
                            <div className="space-y-3">
                                <Badge className="bg-primary text-white border-none py-2 px-6 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Academic Curriculum Vault</Badge>
                                <h3 className="text-4xl sm:text-5xl font-display font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">Course <span className="text-primary">Catalog</span></h3>
                            </div>
                            <div className="flex items-center gap-3 p-5 bg-rose-50 dark:bg-primary/10 rounded-3xl border border-rose-100 dark:border-primary/20">
                                <GraduationCap size={22} className="text-primary" />
                                <div>
                                    <p className="text-[8px] font-black text-primary uppercase tracking-widest">{fullCourseCatalog.length} Active Modules</p>
                                    <p className="text-xs font-black text-slate-700 dark:text-white/80">Semester Efficiency Active</p>
                                </div>
                            </div>
                        </div>

                        <Card className="bg-white dark:bg-slate-900/80 border-rose-50 dark:border-white/5 rounded-[3rem] shadow-enterprise overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-white/5 border-b border-rose-50 dark:border-white/5">
                                            {['#', 'Year', 'Academic Year', 'Semester', 'Course Code', 'Description', 'LTPS', 'Section', 'Faculty Name'].map((th, i) => (
                                                <th key={i} className="px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{th}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {fullCourseCatalog.map((row, i) => (
                                            <tr key={i} className="hover:bg-rose-50/30 dark:hover:bg-primary/5 transition-all group">
                                                <td className="px-6 py-6 text-xs font-black text-slate-400 group-hover:text-primary transition-colors">{row.id}</td>
                                                <td className="px-6 py-6 text-xs font-bold text-slate-700 dark:text-white">{row.year}</td>
                                                <td className="px-6 py-6 text-xs font-bold text-slate-700 dark:text-white">{row.academicYear}</td>
                                                <td className="px-6 py-6 text-xs font-bold text-slate-700 dark:text-white">
                                                    <Badge className="bg-slate-100 dark:bg-white/5 text-slate-500 border-none rounded-lg text-[9px] font-black uppercase tracking-widest">{row.semester}</Badge>
                                                </td>
                                                <td className="px-6 py-6 text-xs font-black text-primary italic">{row.courseCode}</td>
                                                <td className="px-6 py-6 text-xs font-bold text-slate-900 dark:text-white max-w-xs">{row.courseDesc}</td>
                                                <td className="px-6 py-6 text-xs font-black text-slate-700 dark:text-white">
                                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/10 font-black">{row.ltps}</span>
                                                </td>
                                                <td className="px-6 py-6 text-xs font-bold text-slate-500">{row.section}</td>
                                                <td className="px-6 py-6 text-sm font-display font-black text-slate-800 dark:text-white italic tracking-tight">{row.facultyName}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* 3. QUIZ ARENA */}
                {activeSection === 'quizzes' && (
                    <motion.div key="quizzes" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
                            <div className="space-y-3">
                                <Badge className="bg-amber-500 text-white border-none py-2 px-6 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Knowledge Verifications</Badge>
                                <h3 className="text-4xl sm:text-5xl font-display font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">Quiz <span className="text-amber-500">Arena</span></h3>
                            </div>
                            <div className="flex items-center gap-3 p-5 bg-amber-50 dark:bg-amber-500/10 rounded-3xl border border-amber-100 dark:border-amber-500/20">
                                <Zap size={22} className="text-amber-500" />
                                <div>
                                    <p className="text-[8px] font-black text-amber-600 uppercase tracking-widest">{quizzes.length} Active Nodes</p>
                                    <p className="text-xs font-black text-amber-700 dark:text-amber-400">Ready to Sync</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {quizzes.map((q, i) => (
                                <Card key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-rose-50 dark:border-white/5 hover:shadow-enterprise hover:border-amber-100 transition-all group">
                                    <div className="flex justify-between items-start mb-8">
                                        <Badge className="bg-amber-500/10 text-amber-600 border-none px-4 py-2 text-[8px] font-black uppercase tracking-widest rounded-xl">{q.difficulty}</Badge>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest"><Clock size={12} />{q.time}m</div>
                                    </div>
                                    <h4 className="text-2xl font-display font-black text-slate-900 dark:text-white italic leading-tight mb-6 group-hover:text-amber-500 transition-colors">{q.title}</h4>
                                    <div className="flex items-center gap-3 mb-10 pb-8 border-b border-slate-50 dark:border-white/5">
                                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{q.questions} Queries</span>
                                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Competitive</span>
                                    </div>
                                    <Button className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-white transition-all">
                                        Launch Simulation <ChevronRight size={16} className="ml-2" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 4. FACULTY QUERY */}
                {activeSection === 'queries' && (
                    <motion.div key="queries" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="max-w-3xl mx-auto">
                        <Card className="bg-white dark:bg-slate-900/80 p-12 lg:p-16 rounded-[4rem] border-rose-100 shadow-enterprise relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-6 mb-12 pb-10 border-b border-slate-50 dark:border-white/5">
                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.8rem] flex items-center justify-center flex-shrink-0"><MessageCircle size={30} /></div>
                                    <div>
                                        <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic tracking-tight leading-none mb-2">Faculty Inquiry</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Peer-to-Peer Knowledge Link</p>
                                    </div>
                                </div>
                                <form onSubmit={handleQuerySubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Domain Node</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDropdownOpen(v => !v)}
                                                    className="w-full h-14 px-6 bg-slate-50 dark:bg-white/5 border border-rose-100 dark:border-white/10 rounded-2xl flex items-center justify-between text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                >
                                                    <span className={selectedQuerySubject ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>
                                                        {selectedQuerySubject
                                                            ? subjects.find(s => String(s.id) === String(selectedQuerySubject))?.name || 'Select Subject...'
                                                            : 'Select Subject...'}
                                                    </span>
                                                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <motion.ul
                                                            initial={{ opacity: 0, y: -8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -8 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute z-50 mt-2 w-full bg-white dark:bg-slate-800 border border-rose-100 dark:border-white/10 rounded-2xl shadow-enterprise overflow-hidden"
                                                        >
                                                            {subjects.length === 0 && (
                                                                <li className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">No subjects available</li>
                                                            )}
                                                            {subjects.map(s => (
                                                                <li
                                                                    key={s.id}
                                                                    onClick={() => { setSelectedQuerySubject(String(s.id)); setIsDropdownOpen(false); }}
                                                                    className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition-colors text-sm font-bold ${
                                                                        String(selectedQuerySubject) === String(s.id)
                                                                        ? 'bg-primary/10 text-primary'
                                                                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10'
                                                                    }`}
                                                                >
                                                                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 opacity-60" />
                                                                    {s.name}
                                                                </li>
                                                            ))}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Encryption</label>
                                            <div className="h-14 px-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl flex items-center justify-between">
                                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Secure Channel</span>
                                                <ShieldCheck size={18} className="text-emerald-500 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Inquiry Message</label>
                                        <textarea rows={5} value={queryText} onChange={(e) => setQueryText(e.target.value)} placeholder="Type your question here..." className="w-full p-6 bg-slate-50 dark:bg-white/5 border border-rose-100 dark:border-white/10 rounded-3xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium text-slate-900 dark:text-white resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-all" />
                                    </div>
                                    <Button type="submit" isLoading={isSendingQuery} className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-primary text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-xl gap-4 hover:bg-primary transition-all">
                                        Send Inquiry <Send size={18} />
                                    </Button>
                                </form>
                            </div>
                            <History size={500} className="absolute -left-40 -bottom-40 text-primary/[0.03] pointer-events-none" />
                        </Card>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default LMSPage;
