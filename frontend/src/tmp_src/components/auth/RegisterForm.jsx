import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';
import { DataContext } from '../../context/DataContext.jsx';
import { toast } from 'sonner';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Badge from '../ui/Badge.jsx';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    course: 'B.Tech Computer Science',
    contact: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Artificial Latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    registerUser({ ...formData, status: 'pending' });
    toast.success('Registration Transmitted', {
      description: 'Your identity node is now awaiting institutional authorization.'
    });
    navigate('/login');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-0 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-secondary/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative z-10"
      >
        {/* Form Side */}
        <div className="p-12 md:p-16 flex flex-col justify-center order-2 md:order-1">
          <div className="mb-8">
            <Badge variant="primary" className="mb-3">Institutional Enrollment</Badge>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Request Access</h1>
            <p className="text-slate-400 font-medium mt-2 text-sm italic">Join the Nexus academic community.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Legal Identity" 
                icon={User} 
                placeholder="Apex Student" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
              <Input 
                label="Institutional Email" 
                icon={Mail} 
                type="email" 
                placeholder="name@apexglobal.edu" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Access Key" 
                icon={Lock} 
                type="password" 
                placeholder="••••••••" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Primary Role</label>
                <select 
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none text-white text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="student" className="text-slate-900">Academic Participant (Student)</option>
                  <option value="faculty" className="text-slate-900">Institutional Faculty</option>
                  <option value="warden" className="text-slate-900">Facility Warden</option>
                </select>
              </div>
            </div>

            <Input 
              label="Associated Department / Program" 
              icon={BookOpen} 
              placeholder="e.g. CS / Mechanical Engineering" 
              required
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            />

            <Button 
              type="submit" 
              className="w-full py-4 text-xs uppercase tracking-widest gap-2 mt-4" 
              isLoading={isLoading}
            >
              Initialize Node Enrollment <ArrowRight size={16} />
            </Button>
          </form>

          <p className="mt-8 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
            Identity Verified? <Link to="/login" className="text-primary hover:text-primary-light transition-colors">Sign In Portal</Link>
          </p>
        </div>

        {/* Visual Info Side */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-primary-dark relative order-1 md:order-2">
          <div className="relative z-10 text-right">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-xl ml-auto">
              <Globe className="text-white fill-white" size={24} />
            </div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              A Global <br /> Network of <br /> <span className="text-white/60">Academia.</span>
            </h2>
          </div>
          
          <div className="relative z-10 space-y-6">
             <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <Users className="text-white" size={24} />
                <p className="text-xs font-bold text-white uppercase tracking-widest">5,000+ Unified Intellectual Nodes</p>
             </div>
             <p className="text-xs text-white/50 font-medium text-right italic">"Excellence through Digital Sovereignty"</p>
          </div>

          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
