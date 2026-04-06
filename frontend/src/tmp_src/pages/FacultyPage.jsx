import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Video, 
  ClipboardCheck, 
  GraduationCap, 
  Calendar, 
  Plus, 
  ArrowRight,
  TrendingUp,
  BookOpen,
  PieChart
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { StatWidget, ActivityWidget, QuickActionWidget } from '../features/dashboard/DashboardWidgets.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Input from '../components/ui/Input.jsx';
import { twMerge } from 'tailwind-merge';

const FacultyPage = () => {
    const { addClass, addQuiz, addAssignment, users, gradeAssignment, addAttendanceRecord, publishExamResult } = useContext(DataContext);
    const { name } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('hub');
    const [classData, setClassData] = useState({ title: '', department: 'CS', time: '', students: 0, batch: '2024-2028' });

    const mentees = users.filter(u => u.role === 'student' && u.batch === '2024-2028').slice(0, 3);

    const activities = [
        { title: 'Attendance Marked for Batch 2024', time: '1 hour ago' },
        { title: 'Quiz "DS-Basics" Published', time: '3 hours ago' },
        { title: 'New Mentee Request Assigned', time: 'Yesterday' }
    ];

    const quickActions = [
        { icon: Video, label: 'Start Live' },
        { icon: ClipboardCheck, label: 'Roll Call' },
        { icon: GraduationCap, label: 'Post Grades' },
        { icon: BookOpen, label: 'Materials' }
    ];

    const renderBentoHub = () => (
        <div className="bento-grid">
            {/* Row 1: Key Metrics */}
            <div className="md:col-span-3">
                <StatWidget 
                    icon={Users} 
                    label="Current Mentees" 
                    value="12" 
                    trend={+1} 
                    color="primary" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={PieChart} 
                    label="Avg. Participation" 
                    value="88%" 
                    trend={+5} 
                    color="success" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={Calendar} 
                    label="Sessions Today" 
                    value="03" 
                    color="warning" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={TrendingUp} 
                    label="Grading Pending" 
                    value="18" 
                    color="error" 
                />
            </div>

            {/* Row 2: Content Body */}
            <div className="md:col-span-8 flex flex-col gap-6">
                <Card 
                  title="Session Scheduler" 
                  subtitle="Virtual Classroom Node" 
                  className="bg-slate-50 dark:bg-white/5 border-none shadow-soft"
                >
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <Input 
                            label="Session Name" 
                            placeholder="e.g. Advanced Data Structures" 
                            value={classData.title}
                            onChange={(e) => setClassData({...classData, title: e.target.value})}
                        />
                        <Input 
                            label="Schedule Time" 
                            placeholder="Today 2:00 PM" 
                            value={classData.time}
                            onChange={(e) => setClassData({...classData, time: e.target.value})}
                        />
                        <div className="md:col-span-2">
                             <Button className="w-full gap-2 py-4" variant="primary">
                                <Plus size={18} /> Initialize Virtual Session
                             </Button>
                        </div>
                    </form>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ActivityWidget activities={activities} />
                    <Card title="Mentee Pipeline" subtitle="Batch 2024 Monitoring" className="flex-1">
                        <div className="space-y-4 mt-4">
                            {mentees.map(m => (
                                <div key={m.email} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                            {m.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{m.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.universityId}</p>
                                        </div>
                                    </div>
                                    <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
                <QuickActionWidget actions={quickActions} />
                <Card className="flex-1 bg-secondary-dark text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full items-start justify-center p-4">
                        <Badge variant="success" className="mb-4">Research Grant</Badge>
                        <h4 className="text-2xl font-display font-bold tracking-tight">Institutional <br /> Funding Node</h4>
                        <p className="text-sm text-slate-400 font-medium mt-2 max-w-[220px]">Submit your Q3 research abstracts for internal peer review and funding.</p>
                        <Button className="mt-8 gap-2" variant="primary">
                            Upload Manuscript <ArrowRight size={16} />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <Badge variant="success" className="mb-2">Academic Instruction</Badge>
                   <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Faculty Hub</h1>
                   <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Professor {name} • Department of CS</p>
                </div>
                <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    {[
                        { id: 'hub', label: 'Instruction' },
                        { id: 'roll', label: 'Attendance' },
                        { id: 'grades', label: 'Grading' },
                        { id: 'mentor', label: 'Mentorship' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={twMerge(
                                "px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                                activeTab === tab.id ? "bg-white dark:bg-primary text-primary dark:text-white shadow-soft" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[600px]">
                {activeTab === 'hub' ? renderBentoHub() : (
                    <Card variant="glass" className="h-[500px] flex items-center justify-center text-center">
                        <div className="animate-fadeInUp">
                             <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen size={32} className="animate-pulse" />
                             </div>
                             <h3 className="text-xl font-bold text-slate-800 dark:text-white">Module Synchronization</h3>
                             <p className="text-sm text-slate-500 font-medium max-w-[280px] mt-2 italic">Faculty dashboards are being optimized for modern institutional governance standards.</p>
                             <Button className="mt-8" variant="secondary" onClick={() => setActiveTab('hub')}>Return to Instruction</Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default FacultyPage;