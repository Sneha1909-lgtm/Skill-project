import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, ChevronRight, Download, ArrowUpRight } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const Fees = () => {
    const fees = [
        { name: 'Semester 6 Tuition', amount: '₹1,25,000', status: 'Paid', date: '12 Mar 2026' },
        { name: 'Institutional Lab Fee', amount: '₹15,000', status: 'Paid', date: '08 Jan 2026' }
    ];

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Financial Hub</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional Nodal Billing</p>
                </div>
                <Badge variant="primary" className="bg-success text-white border-none py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase shadow-lg shadow-success/20">Clearance Node Verified</Badge>
            </div>
            
            <div className="flex flex-col gap-4">
                {fees.map((fee, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/20 transition-all cursor-pointer group/item gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 shrink-0 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-primary border border-slate-100 dark:border-white/10 group-hover/item:scale-105 transition-all">
                                <CreditCard size={20} />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-[11px] font-bold text-slate-800 dark:text-white truncate">{fee.name}</h4>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{fee.date}</span>
                                   <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10 hidden sm:block" />
                                   <span className="text-[9px] font-bold text-success uppercase tracking-widest flex items-center gap-1 shrink-0"><CheckCircle2 size={9} /> Paid</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-white/5">
                            <p className="text-sm font-display font-bold text-slate-900 dark:text-white shrink-0">{fee.amount}</p>
                            <span className="text-[8px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">Receipt <Download size={8} /></span>
                        </div>
                    </div>
                ))}
            </div>
            
            <Button variant="secondary" className="w-full mt-8 py-4 text-xs font-bold uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
               Initialize Payment Nexus <ArrowUpRight size={16} />
            </Button>
            
            {/* Iridescent effects */}
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-700" />
        </Card>
    );
};

export default Fees;
