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
    course: '',
    universityId: '',
    branch: '',
    batch: '',
    semester: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await registerUser({ ...formData });
      toast.success('Registration Successful', {
        description: 'Profile created in Nexus database.'
      });
      navigate('/login');
    } catch (error) {
      toast.error('Registration Failure', {
        description: error.response?.data?.message || 'The backend could not process your enrollment.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-0 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl grid md:grid-cols-2 bg-secondary/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative z-10"
      >
        {/* Form Side */}
        <div className="p-10 md:p-14 flex flex-col justify-center order-2 md:order-1 overflow-y-auto max-h-[90vh]">
          <div className="mb-6">
            <Badge variant="primary" className="mb-3">Institutional Enrollment</Badge>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Request Access</h1>
            <p className="text-slate-400 font-medium mt-1 text-sm italic">Join the Nexus academic community.</p>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <Input 
              label="Legal Identity" 
              icon={User} 
              placeholder="Academic Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />
            <Input 
              label="Institutional Email" 
              icon={Mail} 
              type="email" 
              placeholder="id@klu.ac.in"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />

            <Input 
              label="Access Key" 
              icon={Lock} 
              type="password" 
              placeholder="••••••••" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />
            
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Primary Role</label>
              <select 
                className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl outline-none text-white text-sm font-medium transition-all"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="student" className="text-slate-900">Student</option>
                <option value="faculty" className="text-slate-900">Faculty</option>
                <option value="warden" className="text-slate-900">Warden</option>
              </select>
            </div>

            <Input 
              label="ID (University ID)" 
              icon={ShieldCheck} 
              placeholder="220003XXXX" 
              required
              value={formData.universityId}
              onChange={(e) => setFormData({...formData, universityId: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />

            <Input 
              label="Phone Number" 
              icon={Globe} 
              placeholder="+91 XXXXX XXXXX" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />

            {formData.role === 'student' && (
              <>
                <Input 
                  label="Branch" 
                  icon={Zap} 
                  placeholder="CSE / ECE / ME" 
                  required
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input 
                  label="Batch" 
                  placeholder="2022-2026" 
                  required
                  value={formData.batch}
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input 
                  label="Semester" 
                  placeholder="VI" 
                  required
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </>
            )}

            <Input 
              label={formData.role === 'faculty' ? 'Department' : 'Associated Program'} 
              icon={BookOpen} 
              placeholder={formData.role === 'faculty' ? 'Computer Science' : 'B.Tech / M.Tech'} 
              required
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
              className="bg-white/5 border-white/10 text-white md:col-span-2"
            />

            <Button 
              type="submit" 
              className="w-full py-4 text-xs uppercase tracking-widest gap-2 mt-2 md:col-span-2" 
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
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary to-primary-dark relative order-1 md:order-2">
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-glass overflow-hidden"
            >
              <img src="/logo.png" alt="KLU Logo" className="w-48 h-48 object-contain" />
            </motion.div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight mb-4">
              Join the <br /> KL University <br /> <span className="text-white/60">Community.</span>
            </h2>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
               <Users className="text-white" size={20} />
               <p className="text-[10px] font-bold text-white uppercase tracking-widest">5,000+ Active Institutional Nodes</p>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full text-center">
             <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">"Excellence Through Digital Sovereignty"</p>
          </div>

          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50" />
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
