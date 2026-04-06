import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Save, Send, Database, ArrowRight, User } from 'lucide-react';
import { DataContext } from '../../context/DataContext.jsx';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import Input from '../ui/Input.jsx';
import { toast } from 'sonner';

const GradingHub = () => {
    const { users, publishExamResult, assignedSubjects } = useContext(DataContext);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [gradeData, setGradeData] = useState({ marks: '', grade: 'A' });

    const students = users.filter(u => u.role === 'student' || u.batch === '2024-2028');

    const handlePublish = () => {
        if(!selectedStudent) return toast.error('Student Node Not Selected');
        if(!selectedSubjectId) return toast.error('Academic Subject Node Not Selected');
        
        publishExamResult({
            studentId: selectedStudent.studentId,
            subjectId: parseInt(selectedSubjectId),
            marks: parseFloat(gradeData.marks),
            grade: gradeData.grade
        });
        
        setSelectedStudent(null);
        setGradeData({ marks: '', grade: 'A' });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Student Selector */}
            <div className="lg:col-span-5">
                <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group">
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">Subject Transcription Node</h3>
                    <div className="space-y-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {students.map(s => (
                            <div 
                                key={s.studentId}
                                onClick={() => setSelectedStudent(s)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group/item ${selectedStudent?.studentId === s.studentId ? 'bg-primary/10 border-primary' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 hover:border-primary/20'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-primary font-bold border border-slate-100 dark:border-white/10 shadow-soft">
                                        {s.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.universityId}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Edit Hub */}
            <div className="lg:col-span-7">
                <Card className="p-10 bg-gradient-to-br from-secondary-dark to-slate-900 border-none shadow-glass rounded-[3rem] text-white relative group overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
                            <div>
                                <h3 className="text-2xl font-display font-bold">Nodal Grading Hub</h3>
                                <p className="text-white/40 text-xs mt-1">Institutional Transcript Engine v4.0</p>
                            </div>
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Database size={24} />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {selectedStudent ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                     <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                                         <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                                             <User size={24} />
                                         </div>
                                         <div>
                                             <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Transcription Node</p>
                                             <h4 className="text-lg font-bold">{selectedStudent.name}</h4>
                                         </div>
                                     </div>

                                     <div className="space-y-6">
                                         <div className="space-y-2">
                                              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Target Subject Node</label>
                                              <select 
                                                value={selectedSubjectId} 
                                                onChange={(e) => setSelectedSubjectId(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                              >
                                                  <option value="" className="bg-slate-900">Select Subject</option>
                                                  {assignedSubjects.map(sub => (
                                                      <option key={sub.id} value={sub.id} className="bg-slate-900">{sub.name}</option>
                                                  ))}
                                              </select>
                                         </div>
                                         
                                         <div className="grid grid-cols-2 gap-8">
                                              <div className="space-y-2">
                                                   <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Numeric Marks</label>
                                                   <Input type="number" value={gradeData.marks} onChange={(e) => setGradeData({...gradeData, marks: e.target.value})} className="bg-white/5 border-white/10 text-white" placeholder="0-100" />
                                              </div>
                                              <div className="space-y-2">
                                                   <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Letter Grade</label>
                                                   <Input value={gradeData.grade} onChange={(e) => setGradeData({...gradeData, grade: e.target.value})} className="bg-white/5 border-white/10 text-white" placeholder="A, B, C, etc." />
                                              </div>
                                         </div>
                                     </div>

                                     <Button 
                                        onClick={handlePublish}
                                        className="w-full py-4 text-[10px] items-center justify-center font-bold uppercase tracking-[0.3em] shadow-xl group/btn mt-4"
                                     >
                                         Synthesize Academic Node <ArrowRight size={16} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                                     </Button>
                                </motion.div>
                            ) : (
                                <div className="h-96 flex flex-col items-center justify-center text-center opacity-30">
                                     <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                         <Database size={40} className="animate-pulse" />
                                     </div>
                                     <h4 className="text-xl font-bold uppercase tracking-widest">Awaiting Nodal Select</h4>
                                     <p className="text-xs font-medium max-w-[240px] mt-2 italic">Institutional node requires an active student identifier to begin transcription.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Iridescent background decoration */}
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
                </Card>
            </div>
        </div>
    );
};

export default GradingHub;
