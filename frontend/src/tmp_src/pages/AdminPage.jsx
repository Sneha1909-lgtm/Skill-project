import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Activity, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Trash2, 
  Edit3,
  TrendingUp,
  LayoutGrid,
  Menu
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import { StatWidget, ActivityWidget } from '../features/dashboard/DashboardWidgets.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Input from '../components/ui/Input.jsx';
import { twMerge } from 'tailwind-merge';

const AdminPage = () => {
    const { users, updateUser, approveUser, classes } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [approvalBatch, setApprovalBatch] = useState('2024-2028');

    const pendingUsers = users.filter(u => u.status === 'pending');
    const activeUsers = users.filter(u => u.status === 'active' && 
        (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         u.universityId?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const renderOverview = () => (
        <div className="space-y-8 animate-fadeInUp">
            {/* Bento Stats */}
            <div className="bento-grid">
                <div className="md:col-span-4">
                    <StatWidget 
                        icon={Users} 
                        label="Active Constituents" 
                        value={activeUsers.length.toString()} 
                        trend={+12} 
                    />
                </div>
                <div className="md:col-span-4">
                    <StatWidget 
                        icon={UserCheck} 
                        label="Auth Requests" 
                        value={pendingUsers.length.toString()} 
                        trend={-5} 
                        color="warning"
                    />
                </div>
                <div className="md:col-span-4">
                    <StatWidget 
                        icon={ShieldCheck} 
                        label="System Integrity" 
                        value="99.9%" 
                        color="success"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Pending Actions */}
                <Card 
                  title="Authorization Pipeline" 
                  subtitle="New User Requests" 
                  className="md:col-span-7"
                >
                    <div className="space-y-4 mt-6">
                        {pendingUsers.length === 0 ? (
                            <div className="py-12 text-center bg-slate-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10">
                                <p className="text-sm font-bold text-slate-400 italic">No pending authorizations in queue.</p>
                            </div>
                        ) : (
                            pendingUsers.map(u => (
                                <motion.div 
                                    layout
                                    key={u.email}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-primary/40 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                            {u.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{u.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{u.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <select 
                                            className="px-3 py-2 bg-slate-50 dark:bg-white/10 rounded-lg text-xs font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                                            value={approvalBatch}
                                            onChange={e => setApprovalBatch(e.target.value)}
                                        >
                                            <option value="2024-2028">Batch 2024</option>
                                            <option value="2023-2027">Batch 2023</option>
                                        </select>
                                        <Button size="sm" onClick={() => approveUser(u.email, approvalBatch)}>Authorize</Button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </Card>

                <div className="md:col-span-5 flex flex-col gap-8">
                     <ActivityWidget activities={[
                         { title: 'System Backup Completed', time: '10 mins ago' },
                         { title: 'New Faculty Role Assigned (Dr. Smith)', time: '2 hours ago' },
                         { title: 'Batch 2028 Infrastructure Finalized', time: 'Yesterday' }
                     ]} />
                     <Card className="bg-secondary-dark text-white border-none shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <TrendingUp className="text-primary mb-4" size={32} />
                            <h4 className="text-xl font-bold tracking-tight">System Insights</h4>
                            <p className="text-sm text-slate-400 mt-2 font-medium">User participation is up <span className="text-primary">15.4%</span> this quarter.</p>
                            <Button className="mt-6 w-full" variant="secondary">Generate Report</Button>
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                     </Card>
                </div>
            </div>
        </div>
    );

    const renderRegistry = () => (
        <div className="space-y-6 animate-fadeInUp">
            <Card className="border-none shadow-soft">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search identity registry..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 border-none text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="secondary" className="flex-1 md:flex-none gap-2">
                            <Filter size={16} /> Filter
                        </Button>
                        <Button variant="primary" className="flex-1 md:flex-none">+ Register New</Button>
                    </div>
                </div>

                <div className="mt-8 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/5">
                                <th className="px-6 py-4">Identity</th>
                                <th className="px-6 py-4">Security Level</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Administrative</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {activeUsers.map(u => (
                                <tr key={u.email} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 font-bold group-hover:text-primary transition-colors">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{u.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{u.universityId || 'SYNCHRONIZING'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">
                                        <Badge variant={u.role === 'admin' ? 'error' : 'primary'}>{u.role}</Badge>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-success" />
                                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">ACTIVE</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-primary transition-colors"><Edit3 size={16} /></button>
                                            <button className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-primary transition-colors"><Mail size={16} /></button>
                                            <button className="p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <Badge variant="error" className="mb-2">Admin Command Center</Badge>
                   <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Governance Portal</h1>
                   <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Root Access Level • System Node v2.0</p>
                </div>
                <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={twMerge(
                            "px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
                            activeTab === 'overview' ? "bg-white dark:bg-primary text-primary dark:text-white shadow-soft" : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        <LayoutGrid size={14} /> Insights
                    </button>
                    <button 
                         onClick={() => setActiveTab('registry')}
                         className={twMerge(
                            "px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
                            activeTab === 'registry' ? "bg-white dark:bg-primary text-primary dark:text-white shadow-soft" : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        <Menu size={14} /> Registry
                    </button>
                </div>
            </div>

            <div className="min-h-[600px]">
                {activeTab === 'overview' ? renderOverview() : renderRegistry()}
            </div>
        </div>
    );
};

export default AdminPage;
