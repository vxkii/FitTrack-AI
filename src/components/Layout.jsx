import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileMenu from './MobileMenu';
import Modal from './Modal';
import { useToast } from '../context/ToastContext';

export default function Layout() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState('workout');

  return (
    <div className="min-h-screen w-full bg-slate-50 flex text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-700 overflow-x-hidden">
      <Sidebar />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onQuickAdd={() => setIsQuickAddOpen(true)}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Quick Add Modal */}
      <Modal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        title="Quick Fitness Log"
      >
        <div className="space-y-4">
          <div className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {['workout', 'meal', 'water', 'weight'].map((type) => (
              <button
                key={type}
                onClick={() => setQuickAddType(type)}
                className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-lg capitalize transition-all ${quickAddType === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {quickAddType === 'workout' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Workout Title</label>
                <input type="text" defaultValue="30-min Evening Cardio" className="input-field" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Duration (min)</label>
                  <input type="number" defaultValue="30" className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Calories (kcal)</label>
                  <input type="number" defaultValue="250" className="input-field" />
                </div>
              </div>
            </div>
          )}

          {quickAddType === 'meal' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Meal Name</label>
                <input type="text" defaultValue="Protein Shake & Protein Bar" className="input-field" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Calories</label>
                  <input type="number" defaultValue="350" className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Protein (g)</label>
                  <input type="number" defaultValue="30" className="input-field" />
                </div>
              </div>
            </div>
          )}

          {quickAddType === 'water' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block mb-1">Water Amount (Liters)</label>
              <input type="number" step="0.1" defaultValue="0.5" className="input-field" />
            </div>
          )}

          {quickAddType === 'weight' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block mb-1">Current Weight (kg)</label>
              <input type="number" step="0.1" defaultValue="68.5" className="input-field" />
            </div>
          )}

          <button
            onClick={() => {
              showToast('success', 'Successfully logged entry!');
              setIsQuickAddOpen(false);
            }}
            className="btn-primary w-full py-2.5 text-sm font-bold mt-4"
          >
            Save Entry
          </button>
        </div>
      </Modal>
    </div>
  );
}
