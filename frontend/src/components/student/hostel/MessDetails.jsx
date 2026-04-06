import React from 'react';
import { Coffee, MapPin, Clock, Zap } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';

const MessDetails = () => {
    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Mess Node Mapping</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Catering & Culinary Scheduling</p>
                </div>
                <Badge variant="primary" className="bg-success text-white border-none py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase shadow-lg shadow-success/20">Operational</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group/item">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                            <MapPin size={20} />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Facility Location</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Central Mess Block-B Node</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group/item">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                            <Coffee size={20} />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Catering Type</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Veg / Non-Veg Institutional Thali</p>
                </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                <Clock size={12} className="text-primary" /> Active Dining: 07:30 - 21:00
            </div>
            
            {/* Iridescent effects */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
        </Card>
    );
};

export default MessDetails;
