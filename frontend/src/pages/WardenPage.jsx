import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MapPin, 
  Search, 
  CheckCircle2, 
  XSquare, 
  Clock, 
  Users, 
  Activity, 
  LayoutGrid, 
  Zap,
  ShieldCheck,
  Send,
  Building,
  Edit2,
  Trash2,
  Layout
} from 'lucide-react';
import { wardenSearchRoomApi, wardenUpdateRoomApi, getAllLeavesApi, approveLeaveApi } from '../services/api.js';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Input from '../components/ui/Input.jsx';
import { toast } from 'sonner';

const WardenPage = () => {
    const [activeTab, setActiveTab] = useState('governance');
    const [pendingLeaves, setPendingLeaves] = useState([]);
    const [approvedLeaves, setApprovedLeaves] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [foundStudent, setFoundStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const res = await getAllLeavesApi();
            const all = res.data || [];
            setPendingLeaves(all.filter(l => l.status === 'PENDING'));
            setApprovedLeaves(all.filter(l => l.status === 'APPROVED'));
        } catch (err) {
            console.error('Leaves Sync Failed');
        }
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!searchQuery) return;
        setIsLoading(true);
        try {
            const res = await wardenSearchRoomApi(searchQuery);
            setFoundStudent(res.data);
            toast.success('Residential Node Indexed', { description: `Found ID: ${searchQuery}` });
        } catch (err) {
            toast.error('Search Failed', { description: 'Institutional ID not found in residential cluster.' });
            setFoundStudent(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateRoom = async (e) => {
        e.preventDefault();
        if (!foundStudent) return;
        setIsUpdating(true);
        try {
            await wardenUpdateRoomApi(foundStudent.studentId, foundStudent);
            toast.success('Residential Metadata Synchronized', { description: 'Room data updated in core database.' });
        } catch (err) {
            toast.error('Update Failed', { description: 'Institutional override rejected by database node.' });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleApprove = async (id, action) => {
        try {
            await approveLeaveApi(id, action);
            toast.success(`Leave ${action === 'APPROVED' ? 'Authorized' : 'Rejected'}`);
            fetchLeaves();
        } catch (err) {
            toast.error('Action Failed');
        }
    };

    const navItems = [
        { id: 'governance', label: 'Outpass Hub', sub: 'Approvals', icon: LayoutGrid },
        { id: 'rooms', label: 'Room Matrix', sub: 'Hostel Nodes', icon: Building }
    ];

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* ── HEADER ──────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <Badge variant="primary" className="mb-2 bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.3em] font-black p-2">Residential Node Authority</Badge>
                   <h1 className="text-5xl font-display font-black text-slate-900 dark:text-white tracking-tighter italic">Hostel <span className="text-primary">Console</span></h1>
                   <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-[10px]">Strategic Residential Monitoring Cluster VIII Active</p>
                </div>
                <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-soft">
                    {navItems.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-500 uppercase tracking-widest ${
                                activeTab === tab.id ? "bg-white dark:bg-primary text-primary dark:text-white shadow-enterprise" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── SECTION CONTENT ─────────────────────────────── */}
            <AnimatePresence mode="wait">
                {activeTab === 'governance' ? (
                    <motion.div key="governance" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Pending Requests */}
                            <Card className="bg-white dark:bg-slate-900 border-none p-10 rounded-[3.5rem] shadow-enterprise">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic tracking-tight">Pending <span className="text-primary">Outpasses</span></h3>
                                    <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest">{pendingLeaves.length} Active</Badge>
                                </div>
                                <div className="space-y-4">
                                    {pendingLeaves.length === 0 ? (
                                        <div className="py-20 text-center rounded-[3rem] bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10">
                                            <ShieldCheck size={40} className="mx-auto mb-4 text-slate-200" />
                                            <p className="text-xs font-black text-slate-400 capitalize">Governance Channel Stable / No pending items</p>
                                        </div>
                                    ) : (
                                        pendingLeaves.map(l => (
                                            <div key={l.id} className="p-6 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/40 transition-all group flex flex-col sm:flex-row items-center justify-between gap-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-black italic">{l.studentName?.[0]}</div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 dark:text-white">{l.studentName}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Reason: <span className="italic">{l.reason}</span></p>
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest"><Clock size={12}/>{l.fromDate}</span>
                                                            <span className="text-slate-200">|</span>
                                                            <span className="flex items-center gap-1.5 text-[9px] font-black text-primary uppercase tracking-widest"><Send size={12}/>To: {l.place}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button onClick={() => handleApprove(l.id, 'APPROVED')} className="w-10 h-10 rounded-xl bg-success/10 text-success"><CheckCircle2 size={18} /></Button>
                                                    <Button onClick={() => handleApprove(l.id, 'REJECTED')} className="w-10 h-10 rounded-xl bg-error/10 text-error"><XSquare size={18} /></Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Card>

                            {/* Approved Requests */}
                            <Card className="bg-slate-50 dark:bg-slate-900 border-none p-10 rounded-[3.5rem] shadow-soft">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-3xl font-display font-black text-slate-400 italic tracking-tight">Approved <span className="text-slate-900 dark:text-white">Registry</span></h3>
                                    <Badge className="bg-slate-200 dark:bg-white/10 text-slate-500 border-none px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest">{approvedLeaves.length} Global</Badge>
                                </div>
                                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                    {approvedLeaves.map(l => (
                                        <div key={l.id} className="p-6 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className="w-10 h-10 bg-success/5 text-success rounded-xl flex items-center justify-center"><CheckCircle2 size={16} /></div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 dark:text-white">{l.studentName}</p>
                                                    <p className="text-[8px] font-bold text-slate-400 tracking-widest uppercase mt-1">Authorized Node • {l.toDate}</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-success/10 text-success border-none text-[8px] tracking-tighter uppercase font-black px-2">VALIDATED</Badge>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="rooms" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                        {/* Advanced Residential Intelligence */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Mess Analytics */}
                            <Card className="lg:col-span-1 bg-white/80 backdrop-blur-3xl border border-rose-100 p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden flex flex-col justify-between">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                         <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center shadow-inner">
                                             <Zap size={24} fill="currentColor" />
                                         </div>
                                         <div>
                                             <h4 className="text-xl font-display font-black italic tracking-tighter">Mess <span className="text-amber-500">Analytics</span></h4>
                                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nodal Dining Sync</p>
                                         </div>
                                    </div>

                                    <div className="space-y-8">
                                        {[
                                            { label: 'Breakfast Hub', val: '420 Nodes', p: 85, c: 'bg-amber-500' },
                                            { label: 'Lunch Sector', val: '580 Nodes', p: 94, c: 'bg-primary' },
                                            { label: 'Dinner Node', val: '510 Nodes', p: 89, c: 'bg-indigo-500' }
                                        ].map((f, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{f.label}</span>
                                                    <span className="text-sm font-black text-slate-900">{f.val}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${f.p}%` }} className={`h-full ${f.c}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Activity size={200} className="absolute -right-20 -bottom-20 text-slate-100 dark:text-white/5 pointer-events-none" />
                            </Card>

                            {/* Maintenance Requests */}
                            <Card className="lg:col-span-2 bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-glass shadow-primary/20 relative overflow-hidden flex flex-col justify-between">
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-10">
                                         <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-glow shadow-primary/30">
                                                <ShieldCheck size={24} fill="currentColor" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-display font-black italic tracking-tighter">Maintenance <span className="text-primary">Lifecycle</span></h4>
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nodal Infrastructure Sync</p>
                                            </div>
                                         </div>
                                         <Badge className="bg-primary/20 text-primary border-none px-4 py-1.5 text-[9px] font-black uppercase tracking-widest scale-110">8 Open Nodes</Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { type: 'Electrical Sector', room: 'B-302', detail: 'Light Node Failure', time: '2h ago' },
                                            { type: 'Plumbing Hub', room: 'A-105', detail: 'Leakage in Sector 4', time: '5h ago' },
                                            { type: 'Furniture Node', room: 'C-204', detail: 'Desk Structural Damage', time: '1d ago' },
                                            { type: 'Network Link', room: 'D-501', detail: 'LAN Sync Issue', time: '3h ago' }
                                        ].map((req, i) => (
                                            <div key={i} className="p-6 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{req.room} Node</span>
                                                    <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{req.time}</span>
                                                </div>
                                                <h5 className="text-sm font-black text-white italic mb-1">{req.type}</h5>
                                                <p className="text-[10px] font-medium text-white/40 italic">{req.detail}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Card className="bg-white dark:bg-slate-900 border-none p-10 rounded-[3.5rem] shadow-enterprise relative overflow-hidden">
                             <div className="relative z-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
                                    <div>
                                        <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic tracking-tight mb-2">Residential Matrix</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Room-to-Student Synchronization Node</p>
                                    </div>
                                    <form onSubmit={handleSearch} className="flex-1 w-full flex gap-4 max-w-2xl">
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
                                            key="edit-room-form"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            onSubmit={handleUpdateRoom}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-rose-50/30 dark:bg-white/5 rounded-[3rem] border border-rose-100 dark:border-white/10"
                                        >
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Full Name</label>
                                                <Input icon={Users} value={foundStudent.name || ''} readOnly className="h-14 bg-white/40 border-none rounded-2xl" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Hostel Node (Building)</label>
                                                <Input 
                                                    icon={Building}
                                                    value={foundStudent.hostelName || ''} 
                                                    onChange={(e) => setFoundStudent({...foundStudent, hostelName: e.target.value})}
                                                    className="h-14 bg-white dark:bg-secondary rounded-2xl"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Room Identifier</label>
                                                <Input 
                                                    icon={MapPin}
                                                    value={foundStudent.roomNo || ''} 
                                                    onChange={(e) => setFoundStudent({...foundStudent, roomNo: e.target.value})}
                                                    className="h-14 bg-white dark:bg-secondary rounded-2xl"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Bed Sector</label>
                                                <Input 
                                                    icon={LayoutGrid}
                                                    value={foundStudent.bedNo || ''} 
                                                    onChange={(e) => setFoundStudent({...foundStudent, bedNo: e.target.value})}
                                                    className="h-14 bg-white dark:bg-secondary rounded-2xl"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Membership Status</label>
                                                <select 
                                                    value={foundStudent.isHostler ? 'Hostler' : 'Day Scholar'}
                                                    onChange={(e) => setFoundStudent({...foundStudent, isHostler: e.target.value === 'Hostler'})}
                                                    className="w-full h-14 px-6 bg-white dark:bg-secondary border border-rose-50 dark:border-white/10 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer"
                                                >
                                                    <option value="Hostler">Hostler Status Active</option>
                                                    <option value="Day Scholar">Day Scholar Status</option>
                                                </select>
                                            </div>
                                            <div className="flex items-end pb-1 gap-4">
                                                <Button type="submit" isLoading={isUpdating} className="flex-1 h-14 rounded-2xl bg-slate-900 dark:bg-primary text-white text-[10px] font-black uppercase tracking-widest gap-2">Sync Grid Data <Activity size={16}/></Button>
                                            </div>
                                        </motion.form>
                                    ) : (
                                        <div className="py-24 text-center rounded-[3rem] bg-slate-50/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10">
                                            <Building size={60} className="mx-auto mb-6 text-slate-200" />
                                            <h4 className="text-xl font-display font-black text-slate-400 italic">Residential Node Offline</h4>
                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">{`Search University ID to establish nodal link`}</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <Home size={400} className="absolute -right-20 -bottom-20 text-primary/[0.03] -rotate-12 pointer-events-none" />
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WardenPage;
