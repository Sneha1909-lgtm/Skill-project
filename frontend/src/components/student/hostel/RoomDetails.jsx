import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Home, Layers, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';
import { DataContext } from '../../../context/DataContext.jsx';

const RoomDetails = () => {
    const { studentProfile } = useContext(DataContext);
    
    if (!studentProfile) return null;

    const isHostler = studentProfile.hostelStatus === 'Hostler';

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-display font-black text-slate-900 dark:text-white italic">Facility <span className="text-primary">Allocation</span></h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Specific Room Mapping Node</p>
                </div>
                <Badge variant={isHostler ? 'primary' : 'secondary'} className={`py-1 px-4 border-none font-black uppercase tracking-widest text-[9px] rounded-xl ${isHostler ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-400'}`}>
                    {isHostler ? 'Occupied Node' : 'Inactive Sector'}
                </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Hostel Hub', value: studentProfile.hostelName || 'N/A', icon: Home },
                    { label: 'Room Identifier', value: studentProfile.roomNo || 'N/A', icon: MapPin },
                    { label: 'Bed Sector', value: studentProfile.bedNo || 'N/A', icon: Layers },
                    { label: 'Residential Status', value: studentProfile.hostelStatus || 'Day Scholar', icon: ShieldCheck }
                ].map((item, i) => (
                    <div key={i} className="p-4 rounded-[1.8rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group/item hover:border-primary/20 transition-all">
                         <div className="flex items-center gap-3 mb-1.5">
                             <item.icon size={14} className="text-primary group-hover/item:scale-110 transition-transform" />
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                         </div>
                         <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">{item.value}</p>
                    </div>
                ))}
            </div>
            
            {/* Iridescent background decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </Card>
    );
};

export default RoomDetails;
