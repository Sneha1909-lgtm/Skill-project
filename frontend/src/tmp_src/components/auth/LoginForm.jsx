import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { DataContext } from '../../context/DataContext.jsx';
import { toast } from 'sonner';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Badge from '../ui/Badge.jsx';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { users } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Artificial Latency for UX Shimmer
    await new Promise(resolve => setTimeout(resolve, 1200));

    const foundUser = users.find(u => u.email === email);
    if (foundUser && foundUser.status === 'active') {
      login({ user: email, role: foundUser.role, token: 'mock-jwt-token' });
      toast.success(`Welcome back, ${foundUser.name}`, {
        description: `Successfully authenticated with ${foundUser.role.toUpperCase()} privileges.`
      });
      navigate(foundUser.role === 'admin' ? '/admin' : foundUser.role === 'faculty' ? '/faculty' : '/dashboard');
    } else if (foundUser && foundUser.status === 'pending') {
      toast.warning('Account Pending Authorization', {
        description: 'Administrator needs to verify your identity node.'
      });
    } else {
      toast.error('Invalid Credentials', {
        description: 'Please verify your institutional email and access key.'
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-secondary/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative z-10"
      >
        {/* Visual Brand Side */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-primary-dark relative">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-xl">
              <Zap className="text-white fill-white" size={24} />
            </div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              Synchronize with <br /> the Institutional <br /> <span className="text-white/60">Node.</span>
            </h2>
          </div>
          
          <div className="relative z-10 space-y-6">
             <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <ShieldCheck className="text-white" size={24} />
                <p className="text-xs font-bold text-white uppercase tracking-widest">Enterprise Grade Security Enabled</p>
             </div>
             <p className="text-xs text-white/50 font-medium">© 2026 Apex Global University • ERP Nexus v4.0</p>
          </div>

          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Form Side */}
        <div className="p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <Badge variant="primary" className="mb-3">Authentication Portal</Badge>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Portal Access</h1>
            <p className="text-slate-400 font-medium mt-2 text-sm italic">Sign in to your university workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input 
              label="Institutional Email" 
              icon={Mail} 
              type="email" 
              placeholder="name@apexglobal.edu" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            />
            <Input 
              label="Access Key" 
              icon={Lock} 
              type="password" 
              placeholder="••••••••" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            />
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary" />
                <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">Remember Node</span>
              </label>
              <Link to="#" className="text-xs font-bold text-primary hover:text-primary-light transition-colors">Reset Access?</Link>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 text-xs uppercase tracking-widest gap-2" 
              isLoading={isLoading}
            >
              Authorize Session <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
              <span className="relative z-10 px-4 bg-secondary-dark/40 text-[10px] font-bold text-slate-500 uppercase tracking-widest mx-auto flex w-fit">External Auth</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button variant="secondary" className="gap-2 h-12 bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Chrome size={18} /> Google
              </Button>
              <Button variant="secondary" className="gap-2 h-12 bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Github size={18} /> GitHub
              </Button>
            </div>
          </div>

          <p className="mt-10 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
            New Academic? <Link to="/register" className="text-primary hover:text-primary-light transition-colors">Request Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
