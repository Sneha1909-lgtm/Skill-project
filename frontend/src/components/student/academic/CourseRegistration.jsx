import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, CheckCircle2, Zap, Clock, ShieldCheck, Library } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const CourseRegistration = () => {
    const [step, setStep] = useState(1);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const courses = [
        { id: 1, code: '21CS3001', name: 'Cloud Native Computing', credits: 4, slots: 'A1, A2' },
        { id: 2, code: '21CS3002', name: 'Advanced Algorithms', credits: 3, slots: 'B1' },
        { id: 3, code: '21CS3003', name: 'ML Ops & Engineering', credits: 4, slots: 'C1, C2' }
    ];

    const toggleCourse = (course) => {
        if(selectedCourses.find(c => c.id === course.id)) {
            setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    return (
        <Card className="bg-gradient-to-br from-secondary-dark to-slate-900 border-none shadow-glass p-10 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Badge variant="primary" className="bg-primary text-white border-none py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase mb-4 shadow-lg shadow-primary/20">Authorized Node: SEM 6 Enrollment</Badge>
                        <h3 className="text-4xl font-display font-bold">Course Registration Hub</h3>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 h-max">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${step >= s ? 'bg-primary text-white shadow-lg' : 'text-white/20'}`}>
                                <span className="text-xs font-bold">{step > s ? <CheckCircle2 size={16} /> : s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <p className="text-white/60 text-sm leading-relaxed">
                            Initialize your academic path selection. The Nexus registration engine auto-optimizes 
                            your timetable while verifying nodal prerequisites.
                        </p>
                        <div className="space-y-3">
                            {courses.map(course => (
                                <div 
                                    key={course.id} 
                                    onClick={() => toggleCourse(course)}
                                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group/item ${selectedCourses.find(c => c.id === course.id) ? 'bg-primary/20 border-primary shadow-lg shadow-primary/10' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                >
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{course.code}</p>
                                        <p className="text-sm font-bold">{course.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{course.credits} Credits</p>
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{course.slots}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
                        <div>
                           <h4 className="text-lg font-bold mb-6 flex items-center gap-3"><Zap className="text-primary" size={20} /> Timetable Simulation</h4>
                           <div className="space-y-4">
                                {selectedCourses.length > 0 ? selectedCourses.map(course => (
                                    <div key={course.id} className="flex items-center gap-4 text-xs font-bold text-white/70 animate-fadeInRight">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span>{course.name} Node Registered</span>
                                    </div>
                                )) : (
                                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest italic pt-10 text-center">No Courses Selected for Simulation</p>
                                )}
                           </div>
                        </div>
                        <div className="mt-10">
                            <div className="flex justify-between items-center mb-6 pt-6 border-t border-white/5">
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Total Credits Locked</p>
                                <p className="text-2xl font-display font-bold">{selectedCourses.reduce((acc, c) => acc + c.credits, 0)}</p>
                            </div>
                            <Button className="w-full py-4 text-xs uppercase tracking-[0.2em] shadow-xl group/btn" disabled={selectedCourses.length === 0}>
                                Execute Institutional Sync <ChevronRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Decorations */}
            <div className="absolute right-0 bottom-0 opacity-10 blur-2xl group-hover:scale-110 transition-transform duration-700">
                <Library size={400} strokeWidth={0.5} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 iridescent-orb opacity-10" />
        </Card>
    );
};

export default CourseRegistration;
