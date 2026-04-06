import React, { useContext } from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';
import { DataContext } from '../../../context/DataContext.jsx';

const gradeColor = (grade) => {
    if (grade === 'O')  return 'text-purple-500';
    if (grade === 'A+') return 'text-green-500';
    if (grade === 'A')  return 'text-blue-500';
    if (grade === 'B+') return 'text-amber-500';
    return 'text-slate-400';
};

const Results = () => {
    const { examResults, studentProfile, loading } = useContext(DataContext);

    const cgpa = studentProfile?.cgpa ? Number(studentProfile.cgpa).toFixed(2) : '—';

    // Parse subjects from latest result
    let subjects = [];
    if (examResults && examResults.length > 0) {
        const latest = examResults[examResults.length - 1];
        try {
            subjects = JSON.parse(latest.subjectsJson || '[]');
        } catch { subjects = []; }
    }

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Academic Results Hub</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Nodal Grading Console</p>
                </div>
                <Badge variant="primary" className="bg-primary/10 text-primary border-primary/20">{cgpa} CGPA</Badge>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[1,2,3].map(i => <div key={i} className="h-14 rounded-2xl bg-white/10 animate-pulse" />)}
                </div>
            ) : subjects.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">No results available yet.</p>
            ) : (
                <div className="space-y-3">
                    {subjects.map((res, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-between hover:bg-white dark:hover:bg-primary/5 transition-all group/item">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-primary border border-slate-100 dark:border-white/10 group-hover/item:scale-105 transition-all">
                                    <FileText size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-800 dark:text-white mb-0.5 truncate max-w-[160px]">{res.name}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">{res.code}</span>
                                        <span className="text-[9px] font-bold text-primary tracking-widest uppercase">{res.credits} Cr</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm font-bold ${gradeColor(res.grade)}`}>{res.grade}</div>
                                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">{res.points} pts</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {examResults && examResults.length > 0 && (
                <div className="mt-6">
                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{examResults[examResults.length-1]?.semester} • {examResults[examResults.length-1]?.academicYear}</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{cgpa} CGPA</p>
                        </div>
                        <span className="text-[9px] font-bold text-success uppercase tracking-widest">{examResults[examResults.length-1]?.totalCredits} Credits</span>
                    </div>
                </div>
            )}

            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
        </Card>
    );
};

export default Results;
