import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  User, 
  LogOut, 
  LayoutDashboard,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const Navbar = () => {
  const { user, role, logout, name } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const roleLabels = {
    admin: 'System Admin',
    faculty: 'Faculty Node',
    student: 'Student Node',
    warden: 'Residential Authority'
  };

  return (
    <nav className="h-20 bg-white/80 dark:bg-secondary/80 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-8 flex items-center justify-between">
      {/* Search Hub */}
      <div className="hidden md:flex items-center flex-1 max-w-md relative group">
        <Search className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search Institutional Nexus..." 
          className="w-full h-11 pl-12 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
        />
      </div>

      {/* Brand Mobile */}
      <div className="md:hidden flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <Zap size={22} fill="currentColor" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight dark:text-white">KL Nexus</span>
      </div>

      {/* Actions Hub */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-4 border-r border-slate-100 dark:border-white/10 pr-6">
           <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-secondary" />
           </button>
           <Badge variant="primary" className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1 text-[8px] font-black tracking-widest uppercase">System Sync: Active</Badge>
        </div>

        {/* User Profile Cluster */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-black shadow-lg">
              {name?.[0] || 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{name || 'Guest Node'}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{roleLabels[role] || 'Public Node'}</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Overlay */}
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-secondary rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-2xl p-4 animate-in fade-in zoom-in duration-300 origin-top-right">
                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl mb-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Identifier</p>
                   <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.email || 'nexus@klu.ac.in'}</p>
                </div>
                <div className="space-y-1">
                  <button onClick={() => {navigate('/profile'); setIsProfileOpen(false);}} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-sm font-bold text-slate-600 dark:text-slate-400">
                    <User size={18} /> Institutional Profile
                  </button>
                  <button onClick={() => {navigate(`/${role || 'student'}`); setIsProfileOpen(false);}} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-sm font-bold text-slate-600 dark:text-slate-400">
                    <LayoutDashboard size={18} /> Command Center
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />
                  <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-error/10 hover:text-error transition-all text-sm font-bold text-error">
                    <LogOut size={18} /> Close Session
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
