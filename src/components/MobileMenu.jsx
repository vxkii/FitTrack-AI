import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  Dumbbell,
  Utensils,
  TrendingUp,
  Target,
  User,
  Settings,
  Sparkles,
  LogOut
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { initialProfile } from '../data/userProfile';

export default function MobileMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleLogout = async () => {
    onClose();
    try {
      await logout();
      showToast('success', 'Logged out successfully.');
    } catch {
      showToast('error', 'Something went wrong. Please try again later.');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Workouts', path: '/workouts', icon: Dumbbell },
    { name: 'Nutrition', path: '/nutrition', icon: Utensils },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
    { name: 'Goals', path: '/goals', icon: Target },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  const displayName = user?.name || initialProfile.name;
  const displayEmail = user?.email || initialProfile.email;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-[280px] xs:w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-fade-in">
        <div>
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
                <Sparkles className="w-4 h-4 fill-white/20" />
              </div>
              <h1 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                FitTrack <span className="text-blue-600">AI</span>
              </h1>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <nav className="p-3 sm:p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-100'
                      : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <UserAvatar email={displayEmail} name={displayName} size="md" />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{displayName}</h4>
              <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
