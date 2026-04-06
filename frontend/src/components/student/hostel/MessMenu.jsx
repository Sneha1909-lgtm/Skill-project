import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ChevronRight, CheckCircle2 } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const MessMenu = () => {
    const weeklyMenu = [
        { day: 'Monday Nodes', breakfast: 'Idly / Dosa Node', lunch: 'South Indian Institutional Thali', dinner: 'Chapathi, Paneer, Curd' },
        { day: 'Tuesday Nodes', breakfast: 'Poha / Vada Node', lunch: 'Sambar Rice, Aloo Fry Node', dinner: 'Veg Pulav, Raitha Node' },
        { day: 'Wednesday Nodes', breakfast: 'Upma / Puri Node', lunch: 'Unlimited Veg Thali', dinner: 'Chinese Institutional Node' }
    ];

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Culinary Menu Matrix</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Weekly Institutional Food Plan</p>
                </div>
                <Badge variant="primary" className="py-1 px-3 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[8px]">Live Nodes</Badge>
            </div>
            
            <div className="space-y-4">
                {weeklyMenu.map((day, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-primary/5 transition-all group/item cursor-pointer"
                    >
                        <div className="flex justify-between items-center mb-3 border-b border-slate-100 dark:border-white/10 pb-2">
                             <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{day.day}</h4>
                             <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Balanced Node</span>
                             </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Breakfast</p>
                                <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{day.breakfast}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lunch Node</p>
                                <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{day.lunch}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dinner Node</p>
                                <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{day.dinner}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <Button variant="secondary" className="w-full mt-8 py-3 text-[10px] font-bold uppercase tracking-widest shadow-xl border-none bg-slate-100 dark:bg-white/5 overflow-hidden relative">Institutional Dining Detailed Matrix <ChevronRight size={14} /></Button>
            {/* Iridescent background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-float" />
        </Card>
    );
};

export default MessMenu;
