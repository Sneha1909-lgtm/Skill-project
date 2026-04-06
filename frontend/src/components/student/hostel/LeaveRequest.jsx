import React, { useState, useContext } from 'react';
import { MapPin, Calendar, ChevronRight, ShieldCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { DataContext } from '../../../context/DataContext.jsx';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const statusColor = (status) => {
    if (status === 'Approved') return 'text-success';
    if (status === 'Declined') return 'text-error';
    return 'text-amber-400';
};

const LeaveRequest = () => {
    const { role } = useContext(AuthContext);
    const { myLeaves, pendingLeaves, applyLeave, approveLeave, loading } = useContext(DataContext);
    const [form, setForm] = useState({ leaveType: 'Home Outpass', reason: '', fromDate: '', toDate: '', fromTime: '', toTime: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseRequest = { ...form };
        if (!form.reason || !form.fromDate || (!form.toDate && form.leaveType !== 'Local Outpass')) return;
        
        // For Local Outpass, toDate might be the same as fromDate or not required if time is enough, 
        // but usually it's same day. We'll let the user decide but validation wise:
        if (form.leaveType === 'Local Outpass' && (!form.fromTime || !form.toTime)) return;

        setSubmitting(true);
        await applyLeave(baseRequest);
        setForm({ leaveType: 'Home Outpass', reason: '', fromDate: '', toDate: '', fromTime: '', toTime: '' });
        setSubmitting(false);
    };

    const leaveList = role === 'student' ? myLeaves : pendingLeaves;

    return (
        <Card className="p-8 bg-gradient-to-br from-secondary-dark to-slate-900 border-none shadow-glass rounded-[3rem] text-white relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 relative z-10">
                <div>
                    <h3 className="text-2xl font-display font-bold">Leave & Outpass Hub</h3>
                    <p className="text-white/40 text-xs mt-1">Institutional Departure Node Status</p>
                </div>
                <Badge variant="primary" className="bg-success text-white border-none py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase shadow-lg shadow-success/20">Operational Flow</Badge>
            </div>

            {/* Apply Form (students only) */}
            {role === 'student' && (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3 col-span-1 md:col-span-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Select Leave Type</label>
                            <div className="flex flex-wrap gap-3">
                                {['Home Outpass', 'Local Outpass', 'Medical Leave'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setForm(f => ({...f, leaveType: type}))}
                                        className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
                                            form.leaveType === type 
                                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Reason</label>
                            <input
                                value={form.reason}
                                onChange={e => setForm(f => ({...f, reason: e.target.value}))}
                                placeholder="Reason for leave..."
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs placeholder:text-white/20 focus:outline-none focus:border-primary/50"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">From Date</label>
                            <input type="date" value={form.fromDate} onChange={e => setForm(f => ({...f, fromDate: e.target.value}))} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50" />
                        </div>
                        
                        {form.leaveType === 'Local Outpass' ? (
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">From Time</label>
                                    <input type="time" value={form.fromTime} onChange={e => setForm(f => ({...f, fromTime: e.target.value}))} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">To Time</label>
                                    <input type="time" value={form.toTime} onChange={e => setForm(f => ({...f, toTime: e.target.value}))} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50" />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">To Date</label>
                                <input type="date" value={form.toDate} onChange={e => setForm(f => ({...f, toDate: e.target.value}))} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50" />
                            </div>
                        )}
                    </div>
                    <Button type="submit" isLoading={submitting} className="w-full py-3 text-xs uppercase tracking-[0.2em]">
                        Submit Leave Request <ChevronRight size={14} className="ml-2" />
                    </Button>
                </form>
            )}

            {/* Leave list */}
            <div className="space-y-3 relative z-10">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                    {role === 'student' ? 'My Leave History' : 'Pending Approvals'}
                </p>
                {loading ? (
                    <div className="space-y-2">{[1,2].map(i => <div key={i} className="h-14 rounded-2xl bg-white/5 animate-pulse" />)}</div>
                ) : leaveList && leaveList.length > 0 ? leaveList.map((lr, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                            {role !== 'student' && <p className="text-sm font-bold text-white">{lr.studentName} <span className="text-[9px] text-white/40">({lr.universityId})</span></p>}
                            <div className="flex items-center gap-3 mt-0.5">
                                <ShieldCheck size={12} className="text-primary" />
                                <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{lr.leaveType} • {lr.fromDate} → {lr.toDate}</span>
                            </div>
                            <p className="text-[9px] text-white/40 mt-0.5">{lr.reason}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${statusColor(lr.status)}`}>{lr.status}</span>
                            {role !== 'student' && lr.status === 'Pending' && (
                                <div className="flex gap-1">
                                    <button onClick={() => approveLeave(lr.id, 'approve')} className="text-[8px] bg-success/20 text-success border border-success/30 px-2 py-1 rounded-lg uppercase font-bold hover:bg-success hover:text-white transition-all">Approve</button>
                                    <button onClick={() => approveLeave(lr.id, 'decline')} className="text-[8px] bg-error/20 text-error border border-error/30 px-2 py-1 rounded-lg uppercase font-bold hover:bg-error hover:text-white transition-all">Decline</button>
                                </div>
                            )}
                        </div>
                    </div>
                )) : (
                    <p className="text-xs text-white/30 text-center py-6">No leave records found.</p>
                )}
            </div>

            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10" />
        </Card>
    );
};

export default LeaveRequest;
