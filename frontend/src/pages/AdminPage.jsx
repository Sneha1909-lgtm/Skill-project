import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Search, 
  UserPlus, 
  CheckCircle2, 
  XCircles,
  Save,
  Trash2,
  Activity,
  User,
  GraduationCap,
  Library
} from 'lucide-react';
import { adminSearchUserApi, adminUpdateUserApi, getAdminStatsApi } from '../services/api.js';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Input from '../components/ui/Input.jsx';
import { toast } from 'sonner';

const AdminPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foundUser, setFoundUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await getAdminStatsApi();
            setStats(res.data);
        } catch (err) {
            console.error('Stats Sync Failed');
        }
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!searchQuery) return;
        setIsLoading(true);
        try {
            const res = await adminSearchUserApi(searchQuery);
            setFoundUser(res.data);
            toast.success('User Node Indexed', { description: `Found identifier: ${searchQuery}` });
        } catch (err) {
            toast.error('Search Failed', { description: 'Institutional ID not found in system cluster.' });
            setFoundUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!foundUser) return;
        setIsUpdating(true);
        try {
            await adminUpdateUserApi(foundUser.userId, foundUser);
            toast.success('Metadata Synchronized', { description: 'User record updated in core database.' });
        } catch (err) {
            toast.error('Update Failed', { description: 'Institutional override rejected by database node.' });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* ── HEADER ──────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <Badge variant="primary" className="mb-2 bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.3em] font-black p-2">Governing Authority</Badge>
                   <h1 className="text-5xl font-display font-black text-slate-900 dark:text-white tracking-tighter italic">Admin <span className="text-primary">Nexus</span></h1>
                   <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-[10px]">Strategic Control Center • System Level 9 Active</p>
                </div>
            </div>

            {/* ── ANALYTICS HUB ───────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Students', val: stats?.totalStudents || '0', icon: GraduationCap, color: 'text-rose-500', bg: 'bg-rose-50' },
                    { label: 'Total Faculty', val: stats?.totalFaculty || '0', icon: Library, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'System Load', val: stats?.uptime || '99.9%', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    { label: 'Live Nodes', val: stats?.totalUsers || '0', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                ].map((item, i) => (
                    <Card key={i} className="bg-white dark:bg-slate-900 border-none p-8 rounded-[2.5rem] shadow-soft hover:shadow-enterprise transition-all group overflow-hidden relative border border-slate-100 dark:border-white/5">
                        <div className={`w-12 h-12 ${item.bg} dark:bg-white/5 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <item.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{item.label}</p>
                        <h4 className="text-3xl font-display font-black text-slate-900 dark:text-white italic leading-none">{item.val}</h4>
                    </Card>
                ))}
            </div>

            {/* ── SYSTEM INTEGRITY & FISCAL MONITOR ─────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* System Integrity Pulse */}
                <Card className="lg:col-span-2 bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-display font-black italic tracking-tight">System <span className="text-primary">Integrity</span> Pulse</h3>
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mt-1">Real-time Nodal Telemetry</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Node Cluster: Secure</span>
                            </div>
                        </div>

                        <div className="h-40 flex items-end gap-1 mb-10 overflow-hidden">
                            {[...Array(40)].map((_, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 20 }}
                                    animate={{ height: [20, Math.random() * 80 + 20, 20] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                                    className="flex-1 bg-gradient-to-t from-primary/80 to-primary rounded-t-sm"
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: 'API Latency', val: '24ms', status: 'Optimal' },
                                { label: 'Database Flux', val: 'Low', status: 'Stable' },
                                { label: 'Auth Sync', val: 'Instant', status: 'Active' }
                            ].map((stat, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-lg font-display font-black italic text-white">{stat.val}</p>
                                    <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-1">{stat.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Fiscal Collection Snapshot */}
                <Card className="bg-white dark:bg-slate-900 border-none p-10 rounded-[3.5rem] shadow-soft relative overflow-hidden flex flex-col justify-between">
                     <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-black italic tracking-tighter">Fiscal <span className="text-amber-500">Collection</span></h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Fee Synchronization</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Tuition Node', val: '₹42.5Cr', p: 85, c: 'bg-amber-500' },
                                { label: 'Hostel Sector', val: '₹12.8Cr', p: 92, c: 'bg-rose-500' },
                                { label: 'Exam Portal', val: '₹4.2Cr', p: 78, c: 'bg-indigo-500' }
                            ].map((f, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{f.label}</span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">{f.val}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${f.p}%` }} className={`h-full ${f.c}`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full mt-10 h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                            Fiscal Audit Report
                        </Button>
                     </div>
                </Card>
            </div>


            {/* ── SEARCH HUB ──────────────────────────────────── */}
            <Card className="bg-white dark:bg-slate-900 border-none p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
                        <div>
                            <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic tracking-tight mb-2">User Indexing</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Student / Faculty / Warden by ID</p>
                        </div>
                        <form onSubmit={handleSearch} className="flex-1 w-full flex gap-4 max-w-2xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Enter Institutional ID or Username..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-16 pl-16 pr-6 bg-slate-50 dark:bg-white/5 border border-rose-100 dark:border-white/10 rounded-[2rem] outline-none text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <Button type="submit" isLoading={isLoading} className="h-16 px-10 rounded-[2rem] bg-primary text-white font-black uppercase tracking-widest text-[11px] shadow-glow shadow-primary/20">Index Node</Button>
                        </form>
                    </div>

                    <AnimatePresence mode="wait">
                        {foundUser ? (
                            <motion.form 
                                key="edit-form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleUpdate}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-rose-50/30 dark:bg-white/5 rounded-[3rem] border border-rose-100 dark:border-white/10 relative"
                            >
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Display Name</label>
                                    <Input 
                                        icon={User}
                                        value={foundUser.name || ''} 
                                        onChange={(e) => setFoundUser({...foundUser, name: e.target.value})}
                                        className="h-14 bg-white/80 dark:bg-secondary rounded-2xl"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">System Username</label>
                                    <Input 
                                        icon={ShieldCheck}
                                        value={foundUser.username || ''} 
                                        onChange={(e) => setFoundUser({...foundUser, username: e.target.value})}
                                        className="h-14 bg-white/80 dark:bg-secondary rounded-2xl"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Institutional Email</label>
                                    <Input 
                                        icon={ShieldCheck}
                                        value={foundUser.email || ''} 
                                        onChange={(e) => setFoundUser({...foundUser, email: e.target.value})}
                                        className="h-14 bg-white/80 dark:bg-secondary rounded-2xl"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Administrative Role</label>
                                    <select 
                                        value={foundUser.role || 'student'}
                                        onChange={(e) => setFoundUser({...foundUser, role: e.target.value})}
                                        className="w-full h-14 px-6 bg-white/80 dark:bg-secondary border border-rose-50 dark:border-white/10 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer"
                                    >
                                        <option value="student">Student Node</option>
                                        <option value="faculty">Faculty Node</option>
                                        <option value="warden">Warden Node</option>
                                        <option value="admin">Admin Node</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Institutional Status</label>
                                    <select 
                                        value={foundUser.status || 'ACTIVE'}
                                        onChange={(e) => setFoundUser({...foundUser, status: e.target.value})}
                                        className="w-full h-14 px-6 bg-white/80 dark:bg-secondary border border-rose-50 dark:border-white/10 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer"
                                    >
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="INACTIVE">INACTIVE</option>
                                        <option value="PNDING">PENDING</option>
                                    </select>
                                </div>
                                <div className="flex items-end pb-1 gap-4">
                                    <Button type="submit" isLoading={isUpdating} className="flex-1 h-14 rounded-2xl bg-slate-900 dark:bg-primary text-white text-[10px] font-black uppercase tracking-widest gap-2">Synchronize metadata <Save size={16}/></Button>
                                    <Button type="button" variant="ghost" className="w-14 h-14 rounded-2xl bg-error/10 text-error hover:bg-error hover:text-white transition-all"><Trash2 size={20}/></Button>
                                </div>
                            </motion.form>
                        ) : (
                            <div className="py-24 text-center rounded-[3rem] bg-slate-50/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10">
                                <div className="w-20 h-20 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                    <Search size={40} />
                                </div>
                                <h4 className="text-xl font-display font-black text-slate-400 italic">Universal User Index Empty</h4>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">Enter credentials above to access governing metadata</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
                <ShieldCheck size={400} className="absolute -right-20 -bottom-20 text-primary/[0.03] -rotate-12 pointer-events-none" />
            </Card>
        </div>
    );
};

export default AdminPage;
