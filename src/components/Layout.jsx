import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileMenu from './MobileMenu';
import Modal from './Modal';
import { auth } from '../services/firebase';
import { useToast } from '../context/ToastContext';
import {
  saveWorkoutHistoryToFirestore,
  saveMealToFirestore,
  saveWaterToFirestore,
  updateUserProfileInFirestore
} from '../services/firebaseAuth';

export default function Layout() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState('workout');

  // Quick Add input state
  const [workoutTitle, setWorkoutTitle] = useState('30-min Evening Cardio');
  const [workoutDuration, setWorkoutDuration] = useState('30');
  const [workoutCalories, setWorkoutCalories] = useState('250');

  const [mealName, setMealName] = useState('Protein Shake & Bar');
  const [mealCalories, setMealCalories] = useState('350');
  const [mealProtein, setMealProtein] = useState('30');

  const [waterAmount, setWaterAmount] = useState('0.5');
  const [weightValue, setWeightValue] = useState('68.5');

  const handleSaveQuickAdd = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      showToast('error', 'Please log in to save entry.');
      return;
    }

    try {
      if (quickAddType === 'workout') {
        const durMin = parseFloat(workoutDuration) || 30;
        await saveWorkoutHistoryToFirestore(uid, {
          workoutName: workoutTitle || 'Cardio Session',
          duration: Math.round(durMin * 60),
          calories: parseFloat(workoutCalories) || 250,
          category: 'Cardio'
        });
        showToast('success', `Logged ${workoutTitle || 'Workout'} (${durMin} min)!`);
      } else if (quickAddType === 'meal') {
        const cal = parseFloat(mealCalories) || 350;
        await saveMealToFirestore(uid, {
          name: mealName || 'Quick Meal',
          calories: cal,
          protein: parseFloat(mealProtein) || 30,
          type: 'Snack'
        });
        showToast('success', `Logged ${mealName || 'Meal'} (${cal} kcal)!`);
      } else if (quickAddType === 'water') {
        const amt = parseFloat(waterAmount) || 0.5;
        await saveWaterToFirestore(uid, {
          amount: amt
        });
        showToast('success', `Logged ${amt} L water!`);
      } else if (quickAddType === 'weight') {
        const w = parseFloat(weightValue) || 70;
        await updateUserProfileInFirestore(uid, { weight: w });
        showToast('success', `Updated weight to ${w} kg!`);
      }
    } catch (err) {
      console.error('Error saving quick add entry:', err);
      showToast('error', 'Failed to save entry. Please try again.');
    } finally {
      setIsQuickAddOpen(false);
    }
  };

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
                <input
                  type="text"
                  value={workoutTitle}
                  onChange={(e) => setWorkoutTitle(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={workoutDuration}
                    onChange={(e) => setWorkoutDuration(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={workoutCalories}
                    onChange={(e) => setWorkoutCalories(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {quickAddType === 'meal' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Meal Name</label>
                <input
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Calories</label>
                  <input
                    type="number"
                    value={mealCalories}
                    onChange={(e) => setMealCalories(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={mealProtein}
                    onChange={(e) => setMealProtein(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {quickAddType === 'water' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block mb-1">Water Amount (Liters)</label>
              <input
                type="number"
                step="0.1"
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          {quickAddType === 'weight' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block mb-1">Current Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          <button
            onClick={handleSaveQuickAdd}
            className="btn-primary w-full py-2.5 text-sm font-bold mt-4"
          >
            Save Entry
          </button>
        </div>
      </Modal>
    </div>
  );
}
