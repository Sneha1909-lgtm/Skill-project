import React, { useState, useContext } from 'react';
import { ArrowRight, Target, Globe, Clock, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { DataContext } from '../../context/DataContext.jsx';

const BroadcastHub = () => {
    const { sendBroadcast, adminStats } = useContext(DataContext);
    const [msg, setMsg] = useState('');
    const [target, setTarget] = useState('All Students');
    const [sending, setSending] = useState(false);
    const [history, setHistory] = useState([
        { title: 'System Maintenance Alert', date: '4 Apr', status: 'Deployed' },
        { title: 'Exam Schedule Update', date: '3 Apr', status: 'Archived' }
    ]);

    const handleBroadcast = async () => {
        if (!msg) return;
        setSending(true);
        await sendBroadcast(msg, target);
        setHistory(prev => [{ title: msg.substring(0, 40) + (msg.length > 40 ? '...' : ''), date: 'Just now', status: 'Deployed' }, ...prev.slice(0, 4)]);
        setMsg('');
        setSending(false);
    };

    const targets = ['All Students', 'All Faculty', 'Residential Node', 'All Users'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeInUp">
            <div className="lg:col-span-8">
                <Card className="p-10 bg-gradient-to-br from-secondary-dark to-slate-900 border-none shadow-glass rounded-[3rem] text-white overflow-hidden group relative h-full">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
                            <div>
                                <h3 className="text-3xl font-display font-bold">Broadcast Transmission Node</h3>
                                <p className="text-white/40 text-xs mt-1 italic">Institutional Messaging Engine v6.0</p>
                            </div>
                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary">
                                <Globe size={28} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] pl-1">Target Nodal Role</label>
                                <div className="flex flex-wrap gap-2">
                                    {targets.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTarget(t)}
                                            className={`px-4 py-2 rounded-xl border text-[9px] font-bold uppercase tracking-widest transition-all ${target === t ? 'bg-primary text-white border-primary' : 'bg-white/5 text-white/40 border-white/10 hover:bg-primary/20 hover:text-white'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] pl-1">Transmission Content</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-medium text-white placeholder:text-white/20 min-h-[180px] outline-none focus:border-primary transition-all"
                                    placeholder="Enter institutional broadcast content..."
                                    value={msg}
                                    onChange={e => setMsg(e.target.value)}
                                />
                            </div>

                            <Button
                                onClick={handleBroadcast}
                                isLoading={sending}
                                className="w-full py-5 text-[10px] items-center justify-center font-bold uppercase tracking-[0.4em] shadow-2xl mt-4"
                            >
                                Execute Nodal Transmission <ArrowRight size={18} className="ml-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -z-10" />
                </Card>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
                <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl relative overflow-hidden group">
                    <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                        <Clock className="text-primary" size={24} /> Transmission History
                    </h3>
                    <div className="space-y-3 relative z-10">
                        {history.map((h, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/20 transition-all">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[150px]">{h.title}</h4>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{h.date}</span>
                                </div>
                                <Badge variant="primary" className="bg-success/10 text-success border-none text-[8px] tracking-widest py-0.5 mt-1">{h.status}</Badge>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-8 bg-primary/10 border border-primary/20 rounded-3xl relative overflow-hidden group flex-1">
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
                            <Target size={32} />
                        </div>
                        <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-2">Live Nodal Reach</h4>
                        <p className="text-sm text-slate-500 font-bold mb-2 uppercase tracking-widest">
                            {adminStats ? `${adminStats.totalStudents} Students • ${adminStats.totalFaculty} Faculty` : 'Loading...'}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-6 animate-pulse">100% Connectivity Hubs</p>
                        <Button className="w-full text-[9px] font-bold uppercase tracking-[0.2em] py-3">
                            Audit Nodal Sync <ShieldCheck size={14} className="ml-2" />
                        </Button>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
                </Card>
            </div>
        </div>
    );
};

export default BroadcastHub;
