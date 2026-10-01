import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Edit3, Award, Dumbbell, Flame, Clock } from 'lucide-react';
import Modal from '../components/Modal';
import UserAvatar from '../components/UserAvatar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { initialProfile } from '../data/userProfile';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const currentProfile = {
    name: user?.name || initialProfile.name,
    email: user?.email || initialProfile.email,
    age: user?.age ?? initialProfile.age,
    height: user?.height ?? initialProfile.height,
    weight: user?.weight ?? initialProfile.weight,
    fitnessGoal: user?.fitnessGoal || initialProfile.fitnessGoal,
    activityLevel: user?.activityLevel || initialProfile.activityLevel,
    memberSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : initialProfile.memberSince,
    statsSummary: initialProfile.statsSummary
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(currentProfile);

  useEffect(() => {
    setEditForm(currentProfile);
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedFields = {
        name: editForm.name.trim(),
        age: Number(editForm.age) || 0,
        height: Number(editForm.height) || 0,
        weight: Number(editForm.weight) || 0,
        fitnessGoal: editForm.fitnessGoal,
        activityLevel: editForm.activityLevel
      };

      const res = await updateProfile(updatedFields);
      if (res.success) {
        showToast('success', 'Profile updated successfully.');
        setIsEditModalOpen(false);
      } else {
        showToast('error', res.message || 'Something went wrong. Please try again later.');
      }
    } catch (err) {
      showToast('error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Profile Card Header */}
      <div className="card p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative">
        <UserAvatar
          email={currentProfile.email}
          name={currentProfile.name}
          size="xl"
          className="border-4 border-white shadow-md shadow-slate-200 shrink-0"
        />
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-extrabold text-2xl lg:text-3xl text-slate-900">{currentProfile.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {currentProfile.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Member since {currentProfile.memberSince}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setEditForm(currentProfile);
                setIsEditModalOpen(true);
              }}
              className="btn-outline py-2 px-4 text-xs font-bold flex items-center justify-center gap-2 self-center md:self-start"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 mt-2">
            <Award className="w-3.5 h-3.5" />
            Goal: {currentProfile.fitnessGoal}
          </div>
        </div>
      </div>

      {/* Fitness Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card text-center p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">Age</span>
          <span className="text-2xl font-black text-slate-900">{currentProfile.age}</span>
          <span className="text-xs text-slate-500 block">years</span>
        </div>
        <div className="card text-center p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">Height</span>
          <span className="text-2xl font-black text-slate-900">{currentProfile.height}</span>
          <span className="text-xs text-slate-500 block">cm</span>
        </div>
        <div className="card text-center p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">Current Weight</span>
          <span className="text-2xl font-black text-slate-900">{currentProfile.weight}</span>
          <span className="text-xs text-slate-500 block">kg</span>
        </div>
        <div className="card text-center p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">Activity Level</span>
          <span className="text-base font-extrabold text-blue-600 truncate block">{currentProfile.activityLevel}</span>
        </div>
      </div>

      {/* Lifetime Stats */}
      <div className="card space-y-4">
        <h3 className="font-bold text-slate-900 text-lg">Fitness Milestone Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Workouts</span>
              <span className="font-extrabold text-slate-900">{currentProfile.statsSummary?.totalWorkouts ?? 48} completed</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Active Time</span>
              <span className="font-extrabold text-slate-900">{currentProfile.statsSummary?.totalHours ?? 36} hrs total</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Calories Burned</span>
              <span className="font-extrabold text-slate-900">{currentProfile.statsSummary?.caloriesBurned ?? '18,400'} kcal</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Active Streak</span>
              <span className="font-extrabold text-slate-900">{currentProfile.statsSummary?.streakDays ?? 12} Days streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Information"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={editForm.email}
              className="input-field opacity-60 cursor-not-allowed bg-slate-100"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Age</label>
              <input
                type="number"
                value={editForm.age}
                onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={editForm.height}
                onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={editForm.weight}
                onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Fitness Goal</label>
            <select
              value={editForm.fitnessGoal}
              onChange={(e) => setEditForm({ ...editForm, fitnessGoal: e.target.value })}
              className="input-field"
            >
              <option value="Build Muscle">Build Muscle</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Maintain Fitness">Maintain Fitness</option>
              <option value="Improve Endurance">Improve Endurance</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Activity Level</label>
            <select
              value={editForm.activityLevel}
              onChange={(e) => setEditForm({ ...editForm, activityLevel: e.target.value })}
              className="input-field"
            >
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Very Active">Very Active</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full py-2.5 text-sm font-bold mt-2">
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
}
