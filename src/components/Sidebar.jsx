import React from 'react';
import { NavLink } from 'react-router-dom';
import {
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

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
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
    <aside className="w-60 xl:w-64 bg-white border-r border-slate-200/80 hidden lg:flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0">
      <div>
        {/* Brand */}
        <div className="p-5 xl:p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div className="min-w-0">
            <h1 className="font-black text-lg xl:text-xl text-slate-900 tracking-tight leading-none truncate">
              FitTrack <span className="text-blue-600">AI</span>
            </h1>
            <span className="text-[9px] xl:text-[10px] font-bold tracking-widest uppercase text-slate-400 block truncate">Fitness Intelligence</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 xl:p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 xl:py-3 rounded-xl font-semibold text-xs xl:text-sm transition-all duration-200 ${isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 xl:w-5 xl:h-5 shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer & Logout */}
      <div className="p-3 xl:p-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <NavLink
          to="/profile"
          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors min-w-0 flex-1 group"
        >
          <UserAvatar email={displayEmail} name={displayName} size="sm" />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
              {displayName}
            </h4>
            <p className="text-[10px] text-slate-400 truncate">{displayEmail}</p>
          </div>
        </NavLink>

        <button
          onClick={handleLogout}
          title="Sign Out"
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
