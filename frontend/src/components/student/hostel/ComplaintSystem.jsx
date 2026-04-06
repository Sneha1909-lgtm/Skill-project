import React from 'react';
import { MessageSquare, AlertCircle, CheckCircle2, ChevronRight, Clipboard } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const ComplaintSystem = () => {
    const { role } = React.useContext(AuthContext);
    const complaints = [
        { id: '#NODE-2401', issue: 'Facility Cooling Issue: C-408 AC Node', status: 'In Progress', date: '5 Apr' },
        { id: '#NODE-2395', issue: 'Institutional Hygiene: Washroom Node Sync', status: 'Resolved', date: '3 Apr' }
    ];

    return (
        <Card className="p-8 bg-slate-900 border-none shadow-glass p-8 rounded-[2.5rem] text-white relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 relative z-10">
                <h3 className="text-xl font-display font-bold flex items-center gap-3">
                    <Clipboard className="text-primary" size={24} />
                    Grievance Sync Node
                </h3>
                <Badge variant="primary" className="bg-primary/20 text-white border-white/20 py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase">Nexus Service Node</Badge>
            </div>
            
            <div className="space-y-4 relative z-10">
                {complaints.map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group/item">
                        <div className="flex justify-between items-center mb-2">
                             <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{item.id}</span>
                                <Badge variant="primary" className={`bg-white/10 text-white/70 border-none tracking-widest px-2 py-0.5 uppercase text-[8px] ${item.status === 'Resolved' ? 'text-success' : 'text-amber-500'}`}>{item.status}</Badge>
                             </div>
                             <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{item.date}</span>
                                {role !== 'student' && item.status !== 'Resolved' && (
                                    <button className="text-[8px] font-bold text-success uppercase tracking-widest bg-success/10 px-2 py-1 rounded hover:bg-success hover:text-white transition-all">Mark Resolved Node</button>
                                )}
                             </div>
                        </div>
                        <p className="text-xs font-bold text-white/50 leading-relaxed mb-4">{item.issue}</p>
                        <div className="flex items-center justify-between pointer-events-none opacity-0 group-hover/item:opacity-100 transition-all">
                             <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Update Recorded: 2h Ago</p>
                             <ChevronRight size={14} className="text-primary" />
                        </div>
                    </div>
                ))}
            </div>
            
            <Button variant="secondary" className="w-full mt-10 py-4 mb-4 text-xs font-bold uppercase tracking-widest bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group">
                New Facility Hub Repair <AlertCircle size={16} />
            </Button>
            
            {/* Iridescent background decoration */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/20 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
        </Card>
    );
};

export default ComplaintSystem;
