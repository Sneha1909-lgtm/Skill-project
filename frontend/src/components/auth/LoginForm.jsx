import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Badge from '../ui/Badge.jsx';

const ROLE_ROUTES = {
  admin: '/admin',
  faculty: '/faculty',
  warden: '/warden',
  student: '/dashboard',
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    if (result.success) {
      const route = ROLE_ROUTES[result.role] || '/student';
      navigate(route);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary-dark flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-secondary/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative z-10"
      >
        {/* Visual Brand Side */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary to-primary-dark relative">
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-56 h-56 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-glass overflow-hidden"
            >
              <img src="/logo.png" alt="KLU Logo" className="w-48 h-48 object-contain" />
            </motion.div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight mb-4">
              KL University <br /> <span className="text-white/60">Institutional Node.</span>
            </h2>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
               <ShieldCheck className="text-white" size={20} />
               <p className="text-[10px] font-bold text-white uppercase tracking-widest">Enterprise Nexus v4.0 Secured</p>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full text-center">
             <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">© 2026 KLEF Deemed to be University</p>
          </div>
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Form Side */}
        <div className="p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <Badge variant="primary" className="mb-3">Authentication Portal</Badge>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Portal Access</h1>
            <p className="text-slate-400 font-medium mt-2 text-sm italic">KL University / KLEF Deemed to be University</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Institutional ID / Username"
              icon={Mail}
              type="text"
              placeholder="e.g. 2400033172 or warden"
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


          <p className="mt-6 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
            New Academic? <Link to="/register" className="text-primary hover:text-primary-light transition-colors">Request Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
