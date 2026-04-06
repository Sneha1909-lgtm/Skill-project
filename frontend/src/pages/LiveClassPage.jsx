import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Monitor, 
  Mic, 
  Video, 
  MessageSquare, 
  LogOut, 
  Send,
  Zap,
  Globe,
  Plus,
  ShieldCheck,
  Award,
  Clock,
  ChevronRight,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { DataContext } from '../context/DataContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { toast } from 'sonner';

const LiveClassPage = () => {
    const { classes = [] } = useContext(DataContext);
    const { role } = useContext(AuthContext);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, user: 'System Hub', text: 'Institutional Neural Link Established. Encryption Level 256-bit active.', type: 'sys' }
    ]);
    const chatBottomRef = useRef(null);

    const pastRecordings = [
        { id: 1, title: 'Distributed Systems & Saga Patterns', duration: '2h 14m', date: 'April 02, 2026', views: 425 },
        { id: 2, title: 'Neural Optimization Architecture', duration: '1h 52m', date: 'March 28, 2026', views: 312 },
    ];

    const handleJoinClass = (classId) => {
        setSelectedClassId(classId);
        toast.success('Synchronization Initiated', { description: 'Joining live transmissive node...' });
    };

    const handleLeaveClass = () => {
        setSelectedClassId(null);
        toast.info('Session Terminated', { description: 'Neural link successfully disconnected.' });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        const newMessage = { id: Date.now(), user: 'You', text: chatInput, type: 'user' };
        setMessages([...messages, newMessage]);
        setChatInput('');
        
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                id: Date.now(), 
                user: 'Dr. John Smith', 
                text: 'Your query has been acknowledged in the simulation buffer.',
                type: 'fac'
            }]);
        }, 2000);
    };

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (selectedClassId) {
        const cls = classes.find(c => c.id === selectedClassId) || classes[0];
        return (
            <div className="min-h-screen bg-[#020617] p-4 lg:p-8 flex flex-col font-sans selection:bg-rose-500/30">
                {/* Cinema Control Bar */}
                <header className="flex items-center justify-between mb-6 px-4">
                    <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-rose-500 shadow-glow shadow-rose-500/10">
                            <Monitor size={24} />
                         </div>
                         <div className="space-y-1">
                            <h2 className="text-xl font-display font-black text-white italic tracking-tight">{cls.title}</h2>
                            <div className="flex items-center gap-4">
                                <Badge className="bg-rose-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-3">Live Transmission</Badge>
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2"><Users size={12} /> {cls.students || 0} Synchronized Nodes</p>
                            </div>
                         </div>
                    </div>
                    <Button onClick={handleLeaveClass} variant="ghost" className="h-12 border border-white/5 bg-white/5 text-white/60 hover:bg-rose-500 hover:text-white rounded-2xl text-[10px] font-black tracking-widest uppercase">
                        Disconnect Node <LogOut size={16} className="ml-3" />
                    </Button>
                </header>

                {/* Cinema Mode Layout */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
                    {/* Main Stage */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="flex-1 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl group">
                            {isCameraOff ? (
                                <div className="text-center space-y-4">
                                    <div className="w-24 h-24 bg-white/5 rounded-full mx-auto flex items-center justify-center text-white/20"><Video size={48} /></div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Camera Stream Offline</p>
                                </div>
                            ) : (
                                <div className="text-center space-y-10 group-hover:scale-110 transition-transform duration-1000">
                                    <div className="w-40 h-40 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-[3rem] flex items-center justify-center text-7xl shadow-glass shadow-rose-500/20">
                                        {role === 'faculty' ? '👨‍🏫' : '👨‍💻'}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-display font-black text-white italic tracking-tight">{role === 'faculty' ? 'Broadcasting Faculty Mode' : `${cls.instructor} Presenting`}</h3>
                                        <div className="h-1 w-24 bg-rose-500/50 rounded-full mx-auto animate-pulse" />
                                    </div>
                                </div>
                            )}

                            {/* Cinema Floating Controls */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/40 backdrop-blur-2xl border border-white/10 p-5 rounded-[2.5rem] shadow-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                                <button onClick={() => setIsMuted(!isMuted)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                                    {isMuted ? <Mic size={24} /> : <Mic size={24} />}
                                </button>
                                <button onClick={() => setIsCameraOff(!isCameraOff)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isCameraOff ? 'bg-rose-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                                    <Video size={24} />
                                </button>
                                <div className="h-8 w-px bg-white/10" />
                                <button className="px-10 h-14 rounded-2xl bg-white text-[#020617] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-rose-500 hover:text-white transition-all">Share Screen</button>
                            </div>

                            <Globe size={600} className="absolute -left-20 -bottom-20 text-rose-500/[0.04] pointer-events-none" />
                        </div>
                    </div>

                    {/* Interaction Buffer */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Card className="flex-1 bg-white/5 border-white/10 p-8 rounded-[3rem] shadow-glass flex flex-col min-h-0">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                <h3 className="text-sm font-black text-white/60 uppercase tracking-widest flex items-center gap-2 italic">
                                    <MessageSquare size={16} className="text-rose-500" />
                                    Neural Chat Node
                                </h3>
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-none uppercase text-[8px] font-black px-3 tracking-widest">Stable Sync</Badge>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex flex-col gap-2 ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-3 px-1">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{msg.user}</span>
                                        </div>
                                        <div className={`p-5 rounded-[1.8rem] text-xs font-medium leading-relaxed max-w-[85%] border backdrop-blur-md ${
                                            msg.type === 'user' 
                                            ? 'bg-rose-500 border-rose-400 text-white shadow-xl shadow-rose-500/10 rounded-tr-none' 
                                            : msg.type === 'fac'
                                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-100 rounded-tl-none'
                                            : 'bg-white/5 border-white/5 text-white/40 italic text-[10px] rounded-tl-none'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatBottomRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="mt-8 relative group">
                                <input 
                                    type="text" 
                                    value={chatInput} 
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Enter query metadata..." 
                                    className="w-full h-16 bg-[#0f172a] border border-white/10 rounded-2xl px-8 pr-16 outline-none focus:border-rose-500/50 text-xs font-medium text-white shadow-inner transition-all group-focus-within:ring-4 ring-rose-500/10"
                                />
                                <button type="submit" className="absolute right-3 top-3 w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-rose-500/20">
                                    <Send size={18} />
                                </button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffafa] dark:bg-slate-950 p-6 sm:p-12 space-y-12">
            {/* Ultra-Glossy Hero Banner */}
            <Card className="bg-gradient-to-br from-white via-rose-50/40 to-white/90 backdrop-blur-3xl border border-rose-100 p-12 lg:p-20 rounded-[4rem] shadow-enterprise relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-[3rem] bg-rose-100/50 border-4 border-rose-500/10 flex items-center justify-center text-rose-500 shadow-glow shadow-rose-500/20 transition-transform duration-700 group-hover:scale-105">
                        <Zap size={64} strokeWidth={1} />
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-6">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <Badge className="bg-rose-500 text-white border-none py-2 px-6 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Real-time Flux Active</Badge>
                            <span className="text-[10px] font-black text-rose-300 uppercase tracking-widest hidden sm:flex items-center gap-2">
                                <Globe size={12} /> Institutional Neural Link
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-display font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                            Virtual <span className="text-rose-500 font-black">Link Hub</span>
                        </h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] italic mb-2 opacity-60">High-Performance Collaborative Intelligence Environments</p>
                    </div>
                </div>
                <Users size={500} className="absolute -right-20 -bottom-20 text-rose-500/[0.03] -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-1000" />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Upcoming Live Nodes */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="flex items-center justify-between px-6">
                        <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white leading-none uppercase italic italic px-4">Live Flux Node List</h3>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-white/5 mx-8" />
                        <div className="flex items-center gap-2 text-rose-500 font-black tracking-widest text-[9px] uppercase"><Clock size={14} /> Scheduled Nodes</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {classes.length === 0 && (
                            <div className="col-span-full py-20 text-center opacity-30">
                                <h4 className="text-2xl font-black uppercase italic tracking-tighter">No Active Nodes</h4>
                            </div>
                        )}
                        {classes.map((cls) => (
                            <Card key={cls.id} className="bg-white dark:bg-slate-900 border-rose-50 dark:border-white/5 p-10 rounded-[3.5rem] hover:shadow-2xl hover:shadow-rose-500/10 transition-all group overflow-hidden relative">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                                        <Zap size={28} />
                                    </div>
                                    <Badge className="bg-slate-900 text-white border-none py-1.5 px-6 rounded-2xl text-[8px] font-black uppercase tracking-widest italic">{cls.department}</Badge>
                                </div>
                                <h4 className="text-3xl font-display font-black text-slate-900 dark:text-white leading-none italic mb-4 group-hover:text-rose-500 transition-colors uppercase tracking-tight">{cls.title}</h4>
                                <div className="grid grid-cols-2 gap-6 mb-12">
                                     <div className="space-y-1">
                                          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Instructor Node</p>
                                          <p className="text-xs font-bold text-slate-700 dark:text-white italic">{cls.instructor}</p>
                                     </div>
                                     <div className="space-y-1">
                                          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Scheduled Time</p>
                                          <p className="text-xs font-bold text-slate-700 dark:text-white italic">{cls.time}</p>
                                     </div>
                                </div>
                                <Button 
                                    onClick={() => handleJoinClass(cls.id)}
                                    className="w-full h-16 rounded-[2rem] bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-rose-200/50 hover:bg-rose-600 transition-all group-hover:tracking-[0.6em]"
                                >
                                    Synchronize <ChevronRight size={14} className="ml-2" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Legacy Archive Section */}
                <div className="lg:col-span-4 space-y-10">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] pl-6 flex items-center gap-3">
                         <History size={16} /> Data Vault Archive
                    </h3>
                    <div className="space-y-6">
                        {pastRecordings.map((session) => (
                            <Card key={session.id} className="bg-white/70 dark:bg-slate-900 border-none p-8 rounded-[2.5rem] shadow-enterprise group hover:scale-[1.02] transition-all cursor-pointer">
                                 <div className="flex items-center justify-between mb-4">
                                     <Badge variant="outline" className="text-[7px] border-slate-200 text-slate-400 font-black tracking-widest uppercase">Encryption: ISO-900</Badge>
                                     <div className="text-[10px] font-black text-rose-500 flex items-center gap-1.5"><Clock size={12} /> {session.duration}</div>
                                 </div>
                                 <h4 className="text-lg font-display font-black text-slate-900 dark:text-white mb-6 leading-tight italic uppercase tracking-tight group-hover:text-rose-500 transition-colors uppercase">{session.title}</h4>
                                 <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{session.date}</p>
                                     <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all">
                                         <ArrowRight size={18} />
                                     </div>
                                 </div>
                            </Card>
                        ))}
                    </div>
                    
                    <Card className="bg-slate-900 p-10 rounded-[3rem] text-center space-y-6 relative overflow-hidden group border-none shadow-3xl">
                         <div className="relative z-10 space-y-6">
                            <Plus size={48} className="text-rose-500 mx-auto group-hover:rotate-180 transition-transform duration-700" />
                            <h4 className="text-xl font-display font-black text-white italic tracking-tight uppercase">Access Shared Buffer</h4>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-loose">Need deeper archive node access?</p>
                            <Button className="w-full bg-white text-slate-900 h-14 rounded-2xl text-[9px] font-black tracking-widest uppercase border-none hover:bg-rose-500 hover:text-white transition-all">Institutional Repository</Button>
                         </div>
                         <ShieldCheck size={200} className="absolute -left-10 -bottom-10 text-white/[0.02] pointer-events-none" />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LiveClassPage;