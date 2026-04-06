import React from 'react';
import { CreditCard, CheckCircle2, ChevronRight } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const HostelFees = () => {
    return (
        <Card className="p-8 bg-primary/5 border border-primary/20 p-8 rounded-[2.5rem] group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xs font-bold text-primary uppercase tracking-[.3em]">Institutional Billing</h3>
                <Badge variant="primary" className="bg-primary/20 text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase">Cleared Node</Badge>
            </div>
            <div className="flex flex-col relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Hostel Yearly Total Fee (AC Node)</span>
                <span className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:scale-105 transition-transform origin-left">₹85,000<span className="text-lg text-slate-400 font-normal">.00</span></span>
                <div className="flex items-center gap-4 text-[10px] font-bold text-success uppercase tracking-widest">
                    <CheckCircle2 size={12} /> Institutional Sync Complete
                </div>
            </div>
            
            <Button variant="secondary" className="w-full mt-8 py-3 text-[10px] font-bold uppercase tracking-widest bg-primary text-white border-none shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] relative z-10">
                Nexus Financial Portal <ChevronRight size={14} />
            </Button>
            
            {/* Iridescent background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-700" />
        </Card>
    );
};

export default HostelFees;
