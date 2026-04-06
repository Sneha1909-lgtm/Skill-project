import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Zap, 
  MessageCircle, 
  FileText, 
  Clock, 
  Target, 
  User, 
  Search, 
  LayoutGrid, 
  Users, 
  CheckCircle2, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar,
  ShieldCheck,
  Send
} from 'lucide-react';
import { 
  facultySearchStudentsApi, 
  facultyUpdateStudentAcademicApi, 
  facultySubmitAttendanceApi,
  getAssignedSubjectsApi,
  postMarksApi
} from '../services/api.js';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Input from '../components/ui/Input.jsx';
import { toast } from 'sonner';

const FacultyPage = () => {
    const [activeTab, setActiveTab] = useState('attendance');
    const [searchQuery, setSearchQuery] = useState('');
    const [foundStudent, setFoundStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Attendance State
    const [attendanceData, setAttendanceData] = useState({ batch: '', semester: '', course: '', classId: '', students: [] });
    const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);

    const handleSearchStudent = async (e) => {
        if (e) e.preventDefault();
        if (!searchQuery) return;
        setIsLoading(true);
        try {
            const res = await facultySearchStudentsApi(searchQuery);
            setFoundStudent(res.data);
            toast.success('Academic Person Indexed', { description: `Found ID: ${searchQuery}` });
        } catch (err) {
            toast.error('Search Failed', { description: 'Institutional ID not found in academic cluster.' });
            setFoundStudent(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateAcademic = async (e) => {
        e.preventDefault();
        if (!foundStudent) return;
        setIsUpdating(true);
        try {
            await facultyUpdateStudentAcademicApi(foundStudent.userId || foundStudent.studentId, foundStudent);
            toast.success('Academic Records Synchronized', { description: 'CGPA and course metadata updated.' });
        } catch (err) {
            toast.error('Update Failed', { description: 'Institutional override rejected.' });
        } finally {
            setIsUpdating(false);
        }
    };

    const navItems = [
        { id: 'attendance', label: 'Attendance', icon: CheckCircle2 },
        { id: 'academic', label: 'Academic Hub', icon: LayoutGrid },
        { id: 'courses', label: 'Course Catalog', icon: BookOpen },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'quizzes', label: 'Quizzes', icon: Zap },
        { id: 'queries', label: 'Queries', icon: MessageCircle },
        { id: 'timetable', label: 'Timetable', icon: Calendar },
        { id: 'profile', label: 'Student Lookup', icon: Search }
    ];

    const renderAttendance = () => (
        <Card className="bg-white dark:bg-slate-900 border-none p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-6 mb-12 pb-10 border-b border-slate-50 dark:border-white/5">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.8rem] flex items-center justify-center"><CheckCircle2 size={30} /></div>
                    <div>
                        <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic tracking-tight">Institutional Attendance Node</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Strategic Classroom Sync Protocol Active</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <Input label="Batch Node" placeholder="e.g. 2024" value={attendanceData.batch} onChange={(e) => setAttendanceData({...attendanceData, batch: e.target.value})} className="h-14 bg-slate-50 border-rose-100 rounded-2xl" />
                    <Input label="Semester Sector" placeholder="e.g. 4" value={attendanceData.semester} onChange={(e) => setAttendanceData({...attendanceData, semester: e.target.value})} className="h-14 bg-slate-50 border-rose-100 rounded-2xl" />
                    <Input label="Course Hub" placeholder="e.g. CS101" value={attendanceData.course} onChange={(e) => setAttendanceData({...attendanceData, course: e.target.value})} className="h-14 bg-slate-50 border-rose-100 rounded-2xl" />
                    <Input label="Class Identifier" placeholder="e.g. C-302" value={attendanceData.classId} onChange={(e) => setAttendanceData({...attendanceData, classId: e.target.value})} className="h-14 bg-slate-50 border-rose-100 rounded-2xl" />
                </div>
                <div className="py-24 text-center rounded-[3rem] bg-slate-50/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 italic text-slate-400">
                    <Users size={60} className="mx-auto mb-6 text-slate-200" />
                    <h4 className="text-xl font-display font-black italic">Roster Interface Initializing</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Populate search parameters above to fetch nodal student registry</p>
                    <Button className="mt-8 px-10 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-glow shadow-primary/20">Fetch Roster</Button>
                </div>
             </div>
        </Card>
    );

    const renderAcademicHub = () => (
        <Card className="bg-white dark:bg-slate-900 border-none p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
                    <div>
                        <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic tracking-tight mb-2">Academic Indexing</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Student CGPA / Attendance / Metadata</p>
                    </div>
                    <form onSubmit={handleSearchStudent} className="flex-1 w-full flex gap-4 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                            <input 
                                type="text" 
                                placeholder="Enter Student University ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-16 pl-16 pr-6 bg-slate-50 dark:bg-white/5 border border-rose-100 dark:border-white/10 rounded-[2rem] outline-none text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <Button type="submit" isLoading={isLoading} className="h-16 px-10 rounded-[2rem] bg-primary text-white font-black uppercase tracking-widest text-[11px] shadow-glow shadow-primary/20">Index Node</Button>
                    </form>
                </div>

                <AnimatePresence mode="wait">
                    {foundStudent ? (
                        <motion.form 
                            key="edit-academic-form"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onSubmit={handleUpdateAcademic}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-rose-50/30 dark:bg-white/5 rounded-[3rem] border border-rose-100 dark:border-white/10"
                        >
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Full Profile Name</label>
                                <Input icon={User} value={foundStudent.name || ''} readOnly className="h-14 bg-white/40 border-none rounded-2xl" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Cumulative CGPA</label>
                                <Input 
                                    icon={Target}
                                    type="number" step="0.01"
                                    value={foundStudent.cgpa || ''} 
                                    onChange={(e) => setFoundStudent({...foundStudent, cgpa: e.target.value})}
                                    className="h-14 bg-white dark:bg-secondary rounded-2xl"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Attendance Matrix (%)</label>
                                <Input 
                                    icon={ShieldCheck}
                                    type="number"
                                    value={foundStudent.attendancePercent || ''} 
                                    onChange={(e) => setFoundStudent({...foundStudent, attendancePercent: e.target.value})}
                                    className="h-14 bg-white dark:bg-secondary rounded-2xl"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Branch Hub</label>
                                <Input 
                                    icon={LayoutGrid}
                                    value={foundStudent.branch || ''} 
                                    onChange={(e) => setFoundStudent({...foundStudent, branch: e.target.value})}
                                    className="h-14 bg-white dark:bg-secondary rounded-2xl"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Course Pathway</label>
                                <Input 
                                    icon={BookOpen}
                                    value={foundStudent.course || ''} 
                                    onChange={(e) => setFoundStudent({...foundStudent, course: e.target.value})}
                                    className="h-14 bg-white dark:bg-secondary rounded-2xl"
                                />
                            </div>
                            <div className="flex items-end pb-1 gap-4">
                                <Button type="submit" isLoading={isUpdating} className="flex-1 h-14 rounded-2xl bg-slate-900 dark:bg-primary text-white text-[10px] font-black uppercase tracking-widest gap-2">Authorize Records <Send size={16}/></Button>
                            </div>
                        </motion.form>
                    ) : (
                        <div className="py-24 text-center rounded-[3rem] bg-slate-50/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 text-slate-300 italic uppercase tracking-[0.2em] font-black text-[12px]">
                            <BookOpen size={60} className="mx-auto mb-6 text-slate-200" />
                            Academic Data Cluster Awaiting Search Link
                        </div>
                    )}
                </AnimatePresence>
             </div>
        </Card>
    );

    const renderGenericPlaceholder = (title, icon) => (
        <Card className="bg-white dark:bg-slate-900 min-h-[500px] flex flex-col items-center justify-center text-center p-20 rounded-[4rem] border-none shadow-enterprise">
             <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mb-10 shadow-glow shadow-primary/20">{React.createElement(icon, { size: 48 })}</div>
             <h3 className="text-4xl font-display font-black text-slate-900 dark:text-white italic tracking-tighter italic mb-4">{title} <span className="text-primary">Node</span></h3>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] max-w-sm leading-relaxed mb-10">This departmental hub is synchronizeing with the core institutional database cluster. Real-time data availability pending.</p>
             <div className="flex gap-4">
                <Button className="h-14 px-10 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-[10px] font-black uppercase tracking-widest">Global Sync</Button>
                <Button variant="ghost" className="h-14 px-10 rounded-2xl border border-slate-100 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest"><Plus size={18}/> New Entry</Button>
             </div>
        </Card>
    );

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* ── HEADER ──────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <Badge variant="primary" className="mb-2 bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.3em] font-black p-2">Academic Authority Hub</Badge>
                   <h1 className="text-5xl font-display font-black text-slate-900 dark:text-white tracking-tighter italic">Faculty <span className="text-primary">Executive</span></h1>
                   <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-[10px]">Campus Academic Core Cluster Level 7 Active</p>
                </div>
            </div>

            {/* ── NAV PILLS ───────────────────────────────────── */}
            <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-[1.8rem] border transition-all duration-500 whitespace-nowrap ${
                            activeTab === item.id 
                            ? "bg-primary border-primary text-white shadow-enterprise font-black" 
                            : "bg-white dark:bg-slate-900 border-rose-50 dark:border-white/5 text-slate-500 hover:text-primary hover:border-primary/20 font-bold"
                        }`}
                    >
                        <item.icon size={18} />
                        <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* ── SECTION CONTENT ─────────────────────────────── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-10"
                >
                    {activeTab === 'attendance' ? renderAttendance() :
                     activeTab === 'academic' ? renderAcademicHub() :
                     activeTab === 'profile' ? renderAcademicHub() : // Reuse student lookup concept
                     renderGenericPlaceholder(navItems.find(i => i.id === activeTab).label, navItems.find(i => i.id === activeTab).icon)}

                    {/* Advanced Faculty Intelligence */}
                    {activeTab === 'attendance' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Research Metrics */}
                            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-3xl border border-rose-100 p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-indigo-500/10 text-indigo-500 rounded-[1.8rem] flex items-center justify-center shadow-inner"><TrendingUp size={28} /></div>
                                        <div>
                                            <h3 className="text-2xl font-display font-black text-slate-900 italic tracking-tight">Nodal Research Metrics</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Strategic Knowledge Accumulation</p>
                                        </div>
                                    </div>
                                    <Badge variant="primary" className="bg-indigo-500/10 text-indigo-500 border-none px-4 py-1.5 text-[9px] font-black uppercase tracking-widest italic">Tier-I Faculty</Badge>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                    {[
                                        { label: 'Scopus Indexed', val: '24', detail: '+3 This Year', color: 'text-indigo-500' },
                                        { label: 'H-Index Node', val: '12', detail: 'Global Ranking', color: 'text-rose-500' },
                                        { label: 'Live Patents', val: '04', detail: '2 Optimized', color: 'text-amber-500' },
                                        { label: 'Grants (INR)', val: '45L', detail: 'DST Auth', color: 'text-emerald-500' }
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center group">
                                            <h4 className={`text-3xl font-display font-black italic mb-1 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</h4>
                                            <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-1">{stat.label}</p>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter italic">{stat.detail}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 flex items-center justify-between">
                                     <div className="flex items-center gap-4">
                                         <Users size={20} className="text-indigo-300" />
                                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                                             Institutional Citations: <span className="text-slate-900 font-black italic ml-2">1,248 Nodes</span>
                                         </p>
                                     </div>
                                     <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest text-indigo-500">Global Sync</Button>
                                </div>
                            </Card>

                            {/* Invigilation Duty Matrix */}
                            <Card className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-glass shadow-primary/20 relative overflow-hidden flex flex-col justify-between">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-glow shadow-primary/30">
                                             <ShieldCheck size={24} fill="currentColor" />
                                         </div>
                                         <div>
                                             <h4 className="text-xl font-display font-black italic tracking-tighter">Duty <span className="text-primary">Matrix</span></h4>
                                             <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nodal Invigilation Sync</p>
                                         </div>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { day: 'Mon', time: '09:00 - 12:00', hall: 'C-302', node: 'SEM-IV' },
                                            { day: 'Wed', time: '14:00 - 17:00', hall: 'D-105', node: 'SEM-VI' },
                                            { day: 'Fri', time: '09:00 - 12:00', hall: 'M-204', node: 'SEM-II' }
                                        ].map((duty, idx) => (
                                            <div key={idx} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                                                <div className="flex justify-between items-center mb-2">
                                                    <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase tracking-widest">{duty.day} Slot</Badge>
                                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{duty.time}</span>
                                                </div>
                                                <p className="text-xs font-black text-white italic tracking-tight">University Hall: {duty.hall}</p>
                                                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mt-1">Sector: {duty.node} Integration</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Zap size={240} className="absolute -right-20 -bottom-20 text-white/5 pointer-events-none" />
                            </Card>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

        </div>
    );
};

export default FacultyPage;