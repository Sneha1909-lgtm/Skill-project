import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, Users, Search, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { DataContext } from '../../context/DataContext.jsx';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import Input from '../ui/Input.jsx';
import { toast } from 'sonner';

const AttendanceMarking = () => {
    const { users, addAttendanceRecord } = useContext(DataContext);
    const [selectedBatch, setSelectedBatch] = useState('2024-2028');
    const [searchTerm, setSearchTerm] = useState('');
    
    const students = users.filter(u => u.role === 'student' && u.batch === selectedBatch);

    const handleMark = (studentEmail, isPresent) => {
        addAttendanceRecord({
            student: studentEmail,
            year: '2025-2026',
            sem: 'Even Sem',
            isPresent
        });
        toast.info(`Attendance Node Synced`, {
            description: `Recorded ${isPresent ? 'Presence' : 'Absence'} for ${studentEmail}`
        });
    };

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Institutional Roll Call</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Nodal Attendance Synchronization</p>
                </div>
                <div className="flex gap-4">
                     <select 
                        value={selectedBatch} 
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 dark:text-white outline-none focus:border-primary transition-all"
                     >
                        <option value="2024-2028">Batch 2024-28</option>
                        <option value="2023-2027">Batch 2023-27</option>
                     </select>
                </div>
            </div>

            <div className="relative mb-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                    placeholder="Search Student ID / Name Node..." 
                    className="pl-12 bg-slate-50 dark:bg-white/5 border-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-3">
                {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student, i) => (
                    <motion.div 
                        key={student.email}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-between hover:border-primary/20 transition-all group/item"
                    >
                        <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center font-bold text-primary border border-slate-200 dark:border-white/10 group-hover/item:scale-105 transition-all">
                                 {student.name.charAt(0)}
                             </div>
                             <div>
                                 <h4 className="text-sm font-bold text-slate-800 dark:text-white">{student.name}</h4>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.universityId}</p>
                             </div>
                        </div>
                        <div className="flex gap-2">
                             <button 
                                onClick={() => handleMark(student.email, true)}
                                className="w-10 h-10 rounded-xl bg-success/10 text-success border border-success/20 flex items-center justify-center hover:bg-success hover:text-white transition-all shadow-lg shadow-success/5"
                             >
                                <CheckCircle2 size={18} />
                             </button>
                             <button 
                                onClick={() => handleMark(student.email, false)}
                                className="w-10 h-10 rounded-xl bg-error/10 text-error border border-error/20 flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-lg shadow-error/5"
                             >
                                <XCircle size={18} />
                             </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Button className="w-full mt-10 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
               Finalize Nodal Session Hub <ArrowRight size={16} />
            </Button>
            
            {/* Iridescent background decoration */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
        </Card>
    );
};

export default AttendanceMarking;
