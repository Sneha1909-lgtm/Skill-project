import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  Trophy, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Play,
  History,
  ShieldCheck,
  Target
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import { toast } from 'sonner';

const QuizPage = () => {
    const { quizzes, updateQuizStatus } = useContext(DataContext);
    const { role } = useContext(AuthContext);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [quizComplete, setQuizComplete] = useState(false);
    const [score, setScore] = useState(0);

    // Dynamic Quiz Data Node
    const sampleQuestions = [
        { 
            id: 1, 
            question: 'Identify the theoretical time complexity of a recursive Binary Search algorithm on a sorted array.', 
            options: ['O(n) Linear Time', 'O(log n) Logarithmic Time', 'O(n²) Quadratic Time', 'O(n log n) Linearithmic Time'], 
            correct: 1 
        },
        { 
            id: 2, 
            question: 'Which architectural pattern follows the Last-In, First-Out (LIFO) protocol for node management?', 
            options: ['Cyclic Queue', 'Monolithic Stack', 'Distributed Tree', 'Asynchronous Graph'], 
            correct: 1 
        },
        { 
            id: 3, 
            question: 'What is the primary synchronization advantage of using a Load Balancer in a High-Availability cluster?', 
            options: ['Data Encryption', 'Traffic Distribution', 'Memory Leak Prevention', 'Binary Compilation'], 
            correct: 1 
        },
    ];

    useEffect(() => {
        let timer;
        if (selectedQuizId && timeLeft > 0 && !quizComplete) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (selectedQuizId && timeLeft === 0 && !quizComplete) {
            handleSubmitQuiz();
        }
        return () => clearInterval(timer);
    }, [timeLeft, selectedQuizId, quizComplete]);

    const handleStartQuiz = (quizId) => {
        const quiz = quizzes.find(q => q.id === quizId);
        if (quiz?.status === 'Available' || role !== 'student') {
            setSelectedQuizId(quizId);
            setCurrentQuestion(0);
            setUserAnswers({});
            setQuizComplete(false);
            setTimeLeft(quiz.time * 60);
            toast.info('Neural Simulation Initialized', { description: `You have ${quiz.time} minutes for this node.` });
        }
    };

    const handleAnswerSelect = (optionIndex) => {
        setUserAnswers({ ...userAnswers, [currentQuestion]: optionIndex });
    };

    const calculateScore = () => {
        let correctCount = 0;
        sampleQuestions.forEach((q, idx) => {
            if (userAnswers[idx] === q.correct) correctCount++;
        });
        return Math.round((correctCount / sampleQuestions.length) * 100);
    };

    const handleSubmitQuiz = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setQuizComplete(true);

        if (role === 'student') {
            updateQuizStatus(selectedQuizId, 'Completed', finalScore);
            toast.success('Simulation Synchronized', { description: `Final verification score: ${finalScore}%` });
        } else {
            toast.info('Preview Finished', { description: 'Faculty results are not persisted to the vault.' });
        }
    };

    const getDifficultyStyles = (difficulty) => {
        switch(difficulty?.toUpperCase()) {
            case 'HARD': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            case 'MEDIUM': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'EASY': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    if (selectedQuizId && !quizComplete) {
        const quiz = quizzes.find(q => q.id === selectedQuizId);
        const question = sampleQuestions[currentQuestion];
        const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

        return (
            <div className="min-h-screen bg-[#fffafa] dark:bg-slate-950 p-6 sm:p-12 flex items-center justify-center">
                <Card className="w-full max-w-4xl bg-white dark:bg-slate-900 shadow-enterprise border-rose-100 p-0 rounded-[4rem] overflow-hidden relative">
                    {/* Progress Header */}
                    <div className="bg-rose-500/5 p-10 pb-6 border-b border-rose-50 dark:border-white/5">
                        <div className="flex justify-between items-center mb-8">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white italic leading-none">{quiz.title}</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Verification Simulation</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-white/5 border border-rose-100 font-bold ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-slate-700 dark:text-white'}`}>
                                    <Clock size={16} />
                                    <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-rose-500 shadow-lg shadow-rose-500/20" />
                        </div>
                    </div>

                    {/* Question Content */}
                    <div className="p-12 sm:p-16 space-y-12">
                        <div className="space-y-4">
                            <Badge className="bg-rose-50 text-rose-500 border-none font-black text-[9px] py-1.5 px-4 tracking-widest uppercase">Node Query {currentQuestion + 1}/{sampleQuestions.length}</Badge>
                            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white italic leading-tight tracking-tight">
                                {question.question}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {question.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(idx)}
                                    className={`group flex items-center gap-6 p-6 rounded-3xl border-2 transition-all duration-300 text-left ${
                                        userAnswers[currentQuestion] === idx 
                                        ? 'bg-rose-500 border-rose-500 text-white shadow-xl shadow-rose-500/20' 
                                        : 'bg-white dark:bg-white/5 border-slate-50 dark:border-white/5 hover:border-rose-100 dark:hover:border-rose-500/30'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-colors ${
                                        userAnswers[currentQuestion] === idx 
                                        ? 'bg-white text-rose-500' 
                                        : 'bg-slate-100 dark:bg-white/10 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500'
                                    }`}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-wide">{option}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-white/5">
                            <Button 
                                variant="ghost" 
                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                disabled={currentQuestion === 0}
                                className="px-8 h-14 rounded-2xl text-[10px] font-black tracking-widest uppercase"
                            >
                                <ArrowLeft size={16} className="mr-2" /> Previous Node
                            </Button>
                            
                            {currentQuestion === sampleQuestions.length - 1 ? (
                                <Button 
                                    onClick={handleSubmitQuiz} 
                                    className="px-10 h-14 rounded-2xl bg-slate-900 dark:bg-rose-500 text-white shadow-xl text-[10px] font-black tracking-widest uppercase"
                                >
                                    Verify Submission
                                </Button>
                            ) : (
                                <Button 
                                    onClick={() => setCurrentQuestion(Math.min(sampleQuestions.length - 1, currentQuestion + 1))}
                                    className="px-10 h-14 rounded-2xl bg-rose-500 text-white shadow-xl text-[10px] font-black tracking-widest uppercase"
                                >
                                    Next Node <ArrowRight size={16} className="ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (quizComplete) {
        return (
            <div className="min-h-screen bg-[#fffafa] dark:bg-slate-950 p-6 flex items-center justify-center">
                 <Card className="w-full max-w-2xl bg-white dark:bg-slate-900 border-rose-100 p-16 rounded-[4rem] shadow-enterprise text-center">
                    <div className="w-24 h-24 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-glow shadow-rose-200">
                        <Trophy size={48} />
                    </div>
                    <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white italic tracking-tighter mb-4">Simulation Result</h2>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-12">Cognitive Verification Protocol 4.2</p>
                    
                    <div className="bg-slate-50 dark:bg-white/5 rounded-[3rem] p-10 mb-12">
                        <div className="text-6xl font-display font-black text-rose-500 italic mb-4">{score}%</div>
                        <div className="h-2 w-48 bg-slate-200 dark:bg-white/10 rounded-full mx-auto overflow-hidden">
                             <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} className="h-full bg-rose-500" />
                        </div>
                        <p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Neural Link Synchronized</p>
                    </div>

                    <Button onClick={() => { setSelectedQuizId(null); setQuizComplete(false); }} className="w-full h-18 rounded-[2.2rem] bg-slate-900 dark:bg-rose-500 text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl">
                        Return to Arena
                    </Button>
                 </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffafa] dark:bg-slate-950 p-6 sm:p-12 space-y-12">
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 px-4">
                <div className="space-y-4">
                    <Badge className="bg-amber-500 text-white border-none py-2 px-6 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Active Quizzes</Badge>
                    <h1 className="text-6xl font-display font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">Quiz <span className="text-rose-500">Arena</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] pl-1">Scholastic Intelligence Simulation Hub</p>
                </div>
                {(role === 'faculty' || role === 'admin') && (
                    <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-white/5 border border-rose-100 rounded-2xl text-[10px] font-black text-rose-500 uppercase tracking-widest shadow-sm">
                        <ShieldCheck size={16} /> Administrative Preview Mode Active
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {quizzes.length === 0 && (
                    <div className="col-span-full py-20 text-center opacity-30">
                        <History size={64} className="mx-auto mb-6" />
                        <h4 className="text-2xl font-black uppercase italic tracking-tighter">No Active Nodes</h4>
                    </div>
                )}
                {quizzes.map((quiz) => (
                    <Card key={quiz.id} className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border-rose-50 dark:border-white/5 hover:shadow-2xl hover:shadow-rose-500/10 transition-all group relative overflow-hidden">
                         <div className="flex justify-between items-start mb-8">
                            <Badge className={`px-4 py-1.5 text-[8px] font-black tracking-widest uppercase border-none rounded-2xl ${getDifficultyStyles(quiz.difficulty)}`}>
                                {quiz.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-200 dark:text-slate-700 uppercase tracking-widest">
                                <Clock size={12} /> {quiz.time}M
                            </div>
                         </div>
                         
                         <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white italic leading-tight uppercase tracking-tight mb-8">
                             {quiz.title}
                         </h3>

                         <div className="flex items-center gap-6 mb-12">
                             <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Target size={12} /> {quiz.questions} Queries</div>
                             <span className="w-1 h-1 bg-slate-200 rounded-full" />
                             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{quiz.subject}</div>
                         </div>

                         <div className="pt-8 border-t border-slate-50 dark:border-white/5">
                            {quiz.status === 'Completed' && role === 'student' ? (
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verification Success</p>
                                        <p className="text-xl font-display font-black text-slate-900 dark:text-white italic">SCORE: {quiz.score}%</p>
                                    </div>
                                    <CheckCircle2 size={24} className="text-emerald-500" />
                                </div>
                            ) : (
                                <Button 
                                    onClick={() => handleStartQuiz(quiz.id)}
                                    className="w-full h-16 rounded-3xl bg-slate-900 dark:bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl group-hover:bg-rose-600 transition-all"
                                >
                                    {role !== 'student' ? 'Preview Simulation' : 'Synchronize Node'} <Play size={14} className="ml-2 group-hover:scale-125 transition-transform" />
                                </Button>
                            )}
                         </div>
                    </Card>
                ))}
            </div>

            <footer className="pt-20 text-center pb-12">
                 <div className="max-w-2xl mx-auto p-12 bg-white/50 dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-rose-100/50">
                    <p className="text-xs font-medium text-slate-500 italic">All simulation attempts are tracked in the <span className="text-rose-500 font-bold uppercase tracking-widest">Digital Transcript Hub</span> for institutional validation.</p>
                 </div>
            </footer>
        </div>
    );
};

export default QuizPage;