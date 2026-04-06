import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  User, 
  ChevronRight, 
  MoreVertical, 
  Sun, 
  Moon,
  Zap,
  Globe,
  Settings
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { clsx } from 'clsx';
import Badge from '../ui/Badge.jsx';

const Navbar = () => {
  const { user, role, name } = useContext(AuthContext);
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pathnames = location.pathname.split('/').filter((x) => x);

  const notifications = [
    { id: 1, text: 'New exam schedule published', type: 'info', time: '5m ago' },
    { id: 2, text: 'Tuition fee payment successful', type: 'success', time: '1h ago' },
    { id: 3, text: 'Warden approved outpass #240', type: 'warning', time: 'yesterday' }
  ];

  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 h-20 px-8 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link 
          to="/dashboard" 
          className="text-slate-400 hover:text-primary transition-colors font-semibold"
        >
          University
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={to}>
              <ChevronRight size={14} className="text-slate-300" />
              <Link
                to={to}
                className={clsx(
                  "font-bold transition-colors capitalize",
                  isLast ? "text-slate-900 dark:text-white" : "text-slate-400 hover:text-primary"
                )}
              >
                {value}
              </Link>
            </React.Fragment>
          );
        })}
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-xl mx-8 relative">
        <motion.div
          animate={{ scale: isSearchFocused ? 1.02 : 1 }}
          className={clsx(
            "flex items-center h-12 px-6 rounded-2xl transition-all duration-300 border bg-white dark:bg-white/5",
            isSearchFocused ? "border-primary ring-4 ring-primary/10" : "border-slate-200 dark:border-white/10"
          )}
        >
          <Search size={18} className={clsx("transition-colors", isSearchFocused ? "text-primary" : "text-slate-400")} />
          <input
            type="text"
            placeholder="Search for students, subjects, or actions..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="flex-1 ml-4 bg-transparent outline-none text-sm font-medium placeholder:text-slate-400 text-slate-700 dark:text-slate-200"
          />
          <kbd className="hidden md:flex h-6 px-1.5 items-center justify-center rounded-md bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-white/5">
            CTRL K
          </kbd>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Real-time Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-11 h-11 rounded-xl glass-dark border border-white/5 flex items-center justify-center text-slate-500 hover:text-primary transition-all relative group"
          >
            <Bell size={20} className="group-hover:animate-bounce" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full ring-2 ring-background ring-offset-2" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-4 w-96 p-2 bg-white dark:bg-secondary rounded-2xl shadow-enterprise border border-slate-200 dark:border-white/10 overflow-hidden"
              >
                <div className="px-4 py-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                  <h4 className="font-bold text-sm">Notifications</h4>
                  <Badge variant="primary">3 New</Badge>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer border-b border-slate-50 dark:border-white/5">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{notif.text}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <Link to="/notifications" className="block text-center py-3 text-xs font-bold text-primary hover:bg-primary/5 transition-all">
                  View All Alerts
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Portal Profile */}
        <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-white/10">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[120px]">{name}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role}</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
            <User size={22} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
