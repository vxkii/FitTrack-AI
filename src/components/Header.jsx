import React from 'react';
import { Bell, Search, Menu, Plus } from 'lucide-react';
import UserAvatar from './UserAvatar';
import { useAuth } from '../context/AuthContext';
import { initialProfile } from '../data/userProfile';

export default function Header({ onOpenMobileMenu, onQuickAdd }) {
  const { user } = useAuth();
  const userName = user?.name || initialProfile.name;
  const userEmail = user?.email || initialProfile.email;
  const firstName = userName.split(' ')[0];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between min-w-0 max-w-full">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="min-w-0">
          <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-slate-900 leading-tight truncate">
            Welcome back, {firstName}! 👋
          </h2>
          <p className="text-xs text-slate-500 font-medium hidden md:block">
            Let's make today a healthy day.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
        {/* Search */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search workouts, meals..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Quick Add Action */}
        <button
          onClick={onQuickAdd}
          className="btn-primary py-2 px-2.5 sm:px-4 text-xs sm:text-sm flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden xs:inline">Quick Log</span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 sm:p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200 shrink-0">
          <UserAvatar email={userEmail} name={userName} size="md" />
        </div>
      </div>
    </header>
  );
}
