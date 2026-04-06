import React from 'react';
import { Users, Phone, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const WardenInfo = () => {
    return (
        <Card className="p-8 bg-gradient-to-br from-secondary-dark to-slate-900 border-none shadow-enterprise rounded-3xl text-white group overflow-hidden relative transition-all duration-500 hover:translate-y-[-5px]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 relative z-10">
                <h3 className="text-lg font-display font-bold flex items-center gap-3">
                    <Users className="text-primary" size={24} />
                    Facility Warden Node
                </h3>
                <Badge variant="primary" className="bg-primary/20 text-white border-white/20 py-1 px-3 text-[10px] tracking-widest uppercase">Office Direct</Badge>
            </div>
            
            <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group/item">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-105 transition-all">
                        <Phone size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Emergency Dispatch</p>
                        <p className="text-sm font-bold text-white">+91 98495 XXXXX</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group/item">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-105 transition-all">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Office Node Timings</p>
                        <p className="text-sm font-bold text-white">09:00 AM - 05:00 PM</p>
                    </div>
                </div>
            </div>

            <Button variant="secondary" className="w-full mt-10 py-4 text-[9px] font-bold uppercase tracking-[0.2em] bg-white text-primary border-none shadow-xl flex items-center justify-center gap-3 active:scale-95 group/btn">
               Institutional Warden Dispatch <MessageSquare size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            
            {/* Iridescent effect */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[120px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
        </Card>
    );
};

export default WardenInfo;
