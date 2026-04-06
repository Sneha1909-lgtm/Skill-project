import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Globe, 
  Users, 
  GraduationCap, 
  Lightbulb, 
  Building2, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  TrendingUp,
  Star,
  Monitor
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState({ name: '', email: '', course: '', phone: '' });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${inquiry.name}! Our admissions node will synchronize with you shortly.`);
    setInquiry({ name: '', email: '', course: '', phone: '' });
  };

  return (
    <div className="bg-secondary-dark min-h-screen text-white overflow-hidden">
      {/* ── AMBIENT NODAL BACKGROUND ─────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="primary" className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.3em] font-black p-3 rounded-xl animate-bounce-slow">UGC Category-I Institution Node</Badge>
            <h1 className="text-7xl lg:text-8xl font-display font-black mb-8 leading-tight tracking-tighter italic">
              KL <span className="text-primary italic">University</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-xl font-medium leading-relaxed">
              Institutional Nexus ERP Node. Strategic academic management and research-driven excellence since 1980.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white shadow-glow shadow-primary/30" onClick={() => navigate('/register')}>
                Admissions 2026 <ChevronRight className="ml-2" size={20} />
              </Button>
              <Button variant="secondary" size="lg" className="h-16 px-10 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10" onClick={() => navigate('/login')}>
                Nexus ERP Portal <Monitor className="ml-2 text-primary" size={20} />
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              {[
                { label: 'NIRF Rank', val: '28' },
                { label: 'NAAC Grade', val: 'A++' },
                { label: 'Active Nodes', val: '50K+' }
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-display font-black text-white italic">{s.val}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 shadow-2xl">
               <div className="grid grid-cols-2 gap-8">
                  {[
                    { icon: Zap, label: 'Engineering', color: 'text-rose-500' },
                    { icon: Building2, label: 'Architecture', color: 'text-amber-500' },
                    { icon: GraduationCap, label: 'Management', color: 'text-emerald-500' },
                    { icon: Lightbulb, label: 'Research', color: 'text-indigo-500' }
                  ].map((col, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all text-center"
                    >
                      <div className={`w-14 h-14 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${col.color}`}>
                        <col.icon size={26} />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest">{col.label}</p>
                    </motion.div>
                  ))}
               </div>
               <div className="mt-8 p-6 bg-primary/10 rounded-3xl border border-primary/20 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary animate-pulse"><Star size={20} fill="currentColor" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Priority Admissions</p>
                    <p className="text-xs font-bold text-slate-300">Phase 1 Synchronization Closing Soon</p>
                  </div>
               </div>
            </div>
            {/* Visual Flux */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ── STRATEGIC INFO GRID ──────────────────────────── */}
      <section className="py-32 container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-white/5 text-slate-400 border-white/10 uppercase tracking-[0.4em] px-6 py-2 rounded-full font-black text-[10px]">Strategic Advantages</Badge>
          <h2 className="text-5xl font-display font-black italic tracking-tigh text-white">Institutional <span className="text-primary">Ecosystem</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <Card title="NAAC A++ Status" subtitle="Accreditation Node" className="p-10 rounded-[3rem] bg-white/5 border-white/5 hover:border-primary/20 transition-all">
             <Award className="text-primary mb-6" size={48} />
             <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Highest possible accreditation grade in India with 3.57/4 CGPA score, ensuring world-class academic standards.</p>
          </Card>
          <Card title="Global Presence" subtitle="International Network" className="p-10 rounded-[3rem] bg-white/5 border-white/5 hover:border-primary/20 transition-all">
             <Globe className="text-primary mb-6" size={48} />
             <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Connectivity with 100+ global universities for research, student exchange, and dual-degree pathways.</p>
          </Card>
          <Card title="Research Hub" subtitle="Cognitive Progress" className="p-10 rounded-[3rem] bg-white/5 border-white/5 hover:border-primary/20 transition-all">
             <Zap className="text-primary mb-6" size={48} />
             <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Pioneering in cloud architecture, AI, and sustainable technologies with 2000+ patents and live research nodes.</p>
          </Card>
        </div>
      </section>

      {/* ── INQUIRY CLUSTER ───────────────────────────── */}
      <section className="py-32 bg-secondary-dark/50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 lg:p-20 relative z-10">
           <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h3 className="text-4xl font-display font-black italic mb-6">Synchronization <br/><span className="text-primary">Request</span></h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">Establish a secure link with our admissions cluster. Our counselors will provide technical guidance on your academic pathway.</p>
                <div className="space-y-6">
                  {[
                    { icon: Users, label: 'Direct Mentorship', sub: 'Expert Faculty Link' },
                    { icon: ShieldCheck, label: 'Placement Security', sub: 'Top Tier Tier-1 Nodes' }
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary"><f.icon size={22} /></div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest">{f.label}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">{f.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <Input placeholder="Full Name" value={inquiry.name} onChange={(e) => setInquiry({...inquiry, name: e.target.value})} required className="h-16 bg-white/5 border-white/10 rounded-2xl" />
                <Input placeholder="Institutional Email" type="email" value={inquiry.email} onChange={(e) => setInquiry({...inquiry, email: e.target.value})} required className="h-16 bg-white/5 border-white/10 rounded-2xl" />
                <div className="grid grid-cols-2 gap-6">
                  <Input placeholder="Course of Interest" value={inquiry.course} onChange={(e) => setInquiry({...inquiry, course: e.target.value})} required className="h-16 bg-white/5 border-white/10 rounded-2xl" />
                  <Input placeholder="Mobile Sector" value={inquiry.phone} onChange={(e) => setInquiry({...inquiry, phone: e.target.value})} required className="h-16 bg-white/5 border-white/10 rounded-2xl" />
                </div>
                <Button type="submit" className="w-full h-16 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-glow shadow-primary/20">Initialize Link <ChevronRight className="ml-2" size={16} /></Button>
              </form>
           </div>
        </div>
      </section>

      {/* ── FOOTER CLUSTER ───────────────────────────── */}
      <footer className="py-20 border-t border-white/5 text-center relative z-10 bg-secondary-dark">
         <div className="mb-10">
            <h4 className="text-2xl font-display font-black text-white italic tracking-tighter mb-2">KL University <span className="text-primary italic">Nexus</span></h4>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Advancing the Frontiers of Knowledge Since 1980</p>
         </div>
         <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Node</span>
            <span className="hover:text-primary cursor-pointer transition-colors">System Security</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Enterprise Terms</span>
         </div>
         <p className="mt-12 text-[10px] font-bold text-slate-600 uppercase tracking-[0.6em]">© 2026 KLEF Deemed to be University. Core 9 Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
