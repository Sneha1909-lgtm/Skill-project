import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  DoorOpen, 
  ShieldAlert, 
  Zap, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Clock,
  LayoutGrid
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import { StatWidget, ActivityWidget, QuickActionWidget } from '../features/dashboard/DashboardWidgets.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Input from '../components/ui/Input.jsx';
import { twMerge } from 'tailwind-merge';

const WardenPage = () => {
    const { users, hostelData, assignRoom } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState('hub');
    const [roomForm, setRoomForm] = useState({ studentEmail: '', roomNumber: '' });

    const pendingPasses = hostelData.flatMap(h => 
        h.outpassRequests.filter(r => r.status === 'Pending').map(r => ({ ...r, student: h.student, room: h.room }))
    );

    const activities = [
        { title: 'Room B-201 Allocated to student@test.com', time: '10 mins ago' },
        { title: 'Maintenance Request: Block C Plumbing', time: '2 hours ago' },
        { title: 'New Out-pass Request: "Family Visit"', time: '4 hours ago' }
    ];

    const quickActions = [
        { icon: DoorOpen, label: 'Assign Room' },
        { icon: ShieldAlert, label: 'Alerts' },
        { icon: Zap, label: 'Power Usage' },
        { icon: Home, label: 'In-Out Log' }
    ];

    const renderBentoHub = () => (
        <div className="bento-grid">
            {/* Row 1: Key Metrics */}
            <div className="md:col-span-3">
                <StatWidget 
                    icon={Home} 
                    label="Current Occupancy" 
                    value="452" 
                    trend={+8} 
                    color="primary" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={Clock} 
                    label="Pending Passes" 
                    value={pendingPasses.length.toString()} 
                    trend={-2} 
                    color="warning" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={ShieldAlert} 
                    label="Active Alerts" 
                    value="03" 
                    color="error" 
                />
            </div>
            <div className="md:col-span-3">
                <StatWidget 
                    icon={Zap} 
                    label="Energy Load" 
                    value="High" 
                    color="error" 
                />
            </div>

            {/* Row 2: Content Body */}
            <div className="md:col-span-8 flex flex-col gap-6">
                <Card 
                  title="Authorization Pipeline" 
                  subtitle="Hostel Out-passes" 
                  className="bg-white dark:bg-white/5 border-none shadow-soft"
                >
                    <div className="space-y-4 mt-6">
                        {pendingPasses.length === 0 ? (
                            <div className="py-12 text-center bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                                <p className="text-sm font-bold text-slate-400 italic">No pending requests.</p>
                            </div>
                        ) : (
                            pendingPasses.map(pass => (
                                <motion.div 
                                    layout
                                    key={pass.id}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/10 border border-slate-100 dark:border-white/5 group hover:border-primary/40 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                            <DoorOpen size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{pass.dates}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pass.student} • Room {pass.room}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-success/10 text-success hover:bg-success transition-all hover:text-white">
                                            <CheckCircle2 size={18} />
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-error/10 text-error hover:bg-error transition-all hover:text-white">
                                            <XCircle size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ActivityWidget activities={activities} />
                    <Card title="Unit Allocation" subtitle="Residential Node Map" className="flex-1 bg-gradient-to-br from-white to-primary/5 dark:from-secondary dark:to-primary/10">
                        <div className="mt-4 space-y-4">
                            <Input 
                                label="Resident ID" 
                                placeholder="Email or UID" 
                                value={roomForm.studentEmail}
                                onChange={(e) => setRoomForm({...roomForm, studentEmail: e.target.value})}
                            />
                            <Input 
                                label="Unit Assignment" 
                                placeholder="Block-Room" 
                                value={roomForm.roomNumber}
                                onChange={(e) => setRoomForm({...roomForm, roomNumber: e.target.value})}
                            />
                            <Button className="w-full" variant="primary">Confirm Node Allocation</Button>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
                <QuickActionWidget actions={quickActions} />
                <Card className="flex-1 bg-amber-500 text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full items-start justify-center p-4">
                        <Badge variant="error" className="mb-4 bg-white/20 text-white border-none uppercase tracking-widest">Maintenance Node</Badge>
                        <h4 className="text-2xl font-display font-bold tracking-tight">Facility <br /> Incident Log</h4>
                        <p className="text-sm text-white/80 font-medium mt-2 max-w-[220px]">02 Priority repairs reported in Block C. Technicians dispatched.</p>
                        <Button className="mt-8 gap-2 bg-white text-amber-600 hover:bg-white/90 shadow-lg" size="sm">
                            View Work Orders <ChevronRight size={16} />
                        </Button>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
                </Card>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <Badge variant="warning" className="mb-2">Residential Command</Badge>
                   <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Facility Console</h1>
                   <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Warden Oversight Level • Campus B-Node</p>
                </div>
                <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    {[
                        { id: 'hub', label: 'Console' },
                        { id: 'rooms', label: 'Occupancy' },
                        { id: 'analytics', label: 'Facility Stats' }
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
                             <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <LayoutGrid size={32} className="animate-pulse" />
                             </div>
                             <h3 className="text-xl font-bold text-slate-800 dark:text-white">Facility Node Syncing</h3>
                             <p className="text-sm text-slate-500 font-medium max-w-[280px] mt-2 italic">Residential dashboards are being upgraded to 2026 enterprise facility standards.</p>
                             <Button className="mt-8" variant="secondary" onClick={() => setActiveTab('hub')}>Return to Console</Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default WardenPage;
