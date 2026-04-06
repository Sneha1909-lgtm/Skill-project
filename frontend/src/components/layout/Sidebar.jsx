import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  CheckCircle, 
  CreditCard, 
  Library, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Bell,
  Search,
  MessageSquare,
  User,
  Home
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { role, user, logout, name } = useContext(AuthContext);

  const menuItems = {
    admin: [
      { icon: LayoutDashboard, label: 'Control Center', path: '/admin' },
      { icon: Library, label: 'LMS Module', path: '/lms' },
      { icon: GraduationCap, label: 'Academic Cluster', path: '/academic' },
      { icon: Home, label: 'Hostel Matrix', path: '/hostel' },
      { icon: User, label: 'Institutional Profile', path: '/profile' },
    ],
    faculty: [
      { icon: LayoutDashboard, label: 'Faculty Hub', path: '/faculty' },
      { icon: Library, label: 'LMS Module', path: '/lms' },
      { icon: User, label: 'Expert Profile', path: '/profile' },
    ],
    student: [
      { icon: LayoutDashboard, label: 'Nodal Dashboard', path: '/dashboard' },
      { icon: GraduationCap, label: 'Academic Module', path: '/academic' },
      { icon: Home, label: 'Hostel Module', path: '/hostel' },
      { icon: Library, label: 'LMS Module', path: '/lms' },
      { icon: User, label: 'Profile', path: '/profile' },
    ],
    warden: [
      { icon: LayoutDashboard, label: 'Warden Console', path: '/warden' },
      { icon: Home, label: 'Hostel Hub', path: '/hostel' },
      { icon: User, label: 'Authority Profile', path: '/profile' },
    ]
  };

  const currentMenu = menuItems[role] || menuItems.student;

  if (!user) return null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-secondary-dark text-slate-400 h-screen sticky top-0 flex flex-col z-50 shadow-2xl border-r border-white/5"
    >
      {/* Brand Section */}
      <Link to="/dashboard" className="h-20 flex items-center px-6 gap-4 border-b border-white/5 glass-dark hover:bg-white/5 transition-all">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden shrink-0">
          <img src="/logo.png" alt="KLU Logo" className="w-16 h-16 object-contain" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-display font-bold text-white tracking-tight text-xl truncate"
            >
              KL University
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {currentMenu.map((item, index) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => 
              twMerge(
                "group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative",
                isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 hover:text-white"
              )
            }
          >
            <item.icon size={22} className={clsx("shrink-0 transition-transform group-hover:scale-110")} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-semibold text-sm whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 bg-secondary-dark/50">
        <button
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-error/10 hover:text-error transition-all group"
        >
          <LogOut size={22} className="shrink-0" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-semibold text-sm"
            >
              Sign Out
            </motion.span>
          )}
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-2 flex items-center justify-center w-full h-10 rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;