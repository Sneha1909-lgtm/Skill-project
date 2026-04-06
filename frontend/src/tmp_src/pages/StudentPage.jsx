import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Library, 
  Settings, 
  Bell, 
  Zap, 
  Clock,
  Briefcase,
  Trophy,
  Activity
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { StatWidget, ActivityWidget, QuickActionWidget } from '../features/dashboard/DashboardWidgets.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Input from '../components/ui/Input.jsx';

const StudentPage = () => {
    const { 
        users, examResults, timetables, attendance, hostelData, requestOutpass,
        libraryData, borrowBook, paymentData, processPayment, submitFeedback
    } = useContext(DataContext);
    const { user } = useContext(AuthContext); 

    const [activeTab, setActiveTab] = useState('hub');
    
    const currentUser = users.find(u => u.email === user) || { course: 'None', batch: 'None' };
    const myExamResult = examResults.find(e => e.student === user);
    const myAttendance = attendance.find(a => a.student === user);
    const myPayments = paymentData.filter(p => p.student === user);

    const activities = [
        { title: 'Fee Payment Processed', time: '2 hours ago' },
        { title: 'New Attendance Recorded', time: '5 hours ago' },
        { title: 'Library Book "Clean Architecture" Borrowed', time: 'Yesterday' }
    ];

    const quickActions = [
        { icon: CreditCard, label: 'Fee Portal' },
        { icon: BookOpen, label: 'Course Resources' },
        { icon: Clock, label: 'Attendance' },
        { icon: Trophy, label: 'Marks' }
    ];

    const renderBentoHub = () => (
        <div className="bento-grid">
            {/* Row 1: Key Performance Metrics */}
            <div className="md:col-span-3">
                <StatWidget 
                    icon={Activity} 
                    label="Attendance" 
                    value={`${myAttendance?.percentage || 0}%`} 
                    trend={+2} 
                    color="primary" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={GraduationCap} 
                    label="Current CGPA" 
                    value={myExamResult?.cgpa || '8.5'} 
                    trend={+0.2} 
                    color="success" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={CreditCard} 
                    label="Due Payments" 
                    value={`₹${myPayments.filter(p => p.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`} 
                    color="warning" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={Library} 
                    label="Library Status" 
                    value="02 Books" 
                    color="error" 
                />
            </div>

            {/* Row 2: Main Layout */}
            <div className="md:col-span-8 flex flex-col gap-6">
                <Card 
                  title="Academic Progress" 
                  subtitle="Semester II" 
                  className="flex-1 bg-gradient-to-br from-white to-primary/5 dark:from-secondary dark:to-primary/10 overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-4">
                            <Zap size={14} className="fill-primary" /> Core Strength
                        </div>
                        <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-white leading-tight">
                            You're in the top <span className="text-primary italic">5%</span> <br /> of your batch this semester.
                        </h2>
                        <Button className="mt-8" variant="primary">View Detailed Analytics</Button>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Today's Schedule" subtitle="Wednesday, Oct 24" className="border-none shadow-enterprise">
                        <div className="space-y-4">
                            {[
                                { time: '09:00 AM', subject: 'Data Structures', room: 'LH-102' },
                                { time: '11:00 AM', subject: 'Microprocessors', room: 'LAB-2' },
                                { time: '02:00 PM', subject: 'Cloud Computing', room: 'LH-201' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:border-primary/30 transition-all">
                                    <div className="text-center shrink-0">
                                        <p className="text-[10px] font-bold text-slate-400 group-hover:text-primary transition-colors">{item.time}</p>
                                    </div>
                                    <div className="flex-1 h-8 w-px bg-slate-200 dark:bg-white/10" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.subject}</p>
                                        <p className="text-xs text-slate-400 font-medium">{item.room}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <ActivityWidget activities={activities} />
                </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
                <QuickActionWidget actions={quickActions} />
                <Card className="flex-1 bg-primary text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full items-center justify-center text-center py-8">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md group-hover:rotate-12 transition-transform duration-500">
                             <GraduationCap size={32} />
                        </div>
                        <h4 className="text-xl font-bold tracking-tight">Academic Scholarship</h4>
                        <p className="text-xs text-white/70 font-medium mt-2 max-w-[200px]">You are eligible for the Merit-based excellence award.</p>
                        <button className="mt-8 px-8 py-3 bg-white text-primary rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg">
                            Apply Now
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 pb-12">
            {/* High-End Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <Badge variant="primary" className="mb-2">Academic Portal</Badge>
                  <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Academic Hub</h1>
                  <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Batch of 2024-28 • {currentUser.course}</p>
                </div>
                <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    {[
                        { id: 'hub', label: 'Hub' },
                        { id: 'exams', label: 'Examinations' },
                        { id: 'finance', label: 'Finance' },
                        { id: 'profile', label: 'Identity' }
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

            {/* Stage Content */}
            <div className="min-h-[600px]">
                {activeTab === 'hub' ? renderBentoHub() : (
                    <Card variant="glass" className="h-[500px] flex items-center justify-center text-center">
                        <div>
                             <Settings size={48} className="text-primary mb-4 mx-auto animate-spin" />
                             <h3 className="text-xl font-bold text-slate-800 dark:text-white">Module Synchronization</h3>
                             <p className="text-sm text-slate-500 font-medium max-w-[280px] mt-2 italic">This feature is currently undergoing a 2026 UI upgrade for higher academic standards.</p>
                             <Button className="mt-8" variant="secondary" onClick={() => setActiveTab('hub')}>Return to Hub</Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default StudentPage;