import React, { useState } from 'react';
import { User, Sliders, Sparkles, Check } from 'lucide-react';
import Modal from '../components/Modal';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [unitSystem, setUnitSystem] = useState('metric');
  const [themeMode, setThemeMode] = useState('light');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSaveSettings = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handlePasswordUpdateSubmit = (e) => {
    e.preventDefault();
    showToast('success', 'Password update request submitted.');
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto min-w-0">
      {/* Page Header */}
      <div>
        <h1 className="font-extrabold text-xl sm:text-2xl lg:text-3xl text-slate-900 leading-tight">Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500">Manage account preferences and app configurations.</p>
      </div>

      {savedAlert && (
        <div className="p-3.5 sm:p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> Preferences updated successfully!
        </div>
      )}

      {/* Account Settings */}
      <div className="card space-y-4 min-w-0">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <User className="w-5 h-5 text-blue-600 shrink-0" />
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">Account Security</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Change Password</h4>
            <p className="text-xs text-slate-500">Update your account password periodically</p>
          </div>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="btn-outline py-2 px-3 text-xs font-bold self-start sm:self-auto shrink-0"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Preferences Settings */}
      <div className="card space-y-5 sm:space-y-6 min-w-0">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Sliders className="w-5 h-5 text-blue-600 shrink-0" />
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">Application Preferences</h3>
        </div>

        {/* Notifications Switch */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Push Notifications</h4>
            <p className="text-xs text-slate-500">Receive daily workout reminders and goal alerts</p>
          </div>
          <button
            onClick={() => {
              setNotifications(!notifications);
              handleSaveSettings();
            }}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${
              notifications ? 'bg-blue-600' : 'bg-slate-300'
            }`}
            aria-label="Toggle Push Notifications"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                notifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Email Digest Switch */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Weekly Email Digest</h4>
            <p className="text-xs text-slate-500">Get weekly progress summaries sent to your inbox</p>
          </div>
          <button
            onClick={() => {
              setEmailDigest(!emailDigest);
              handleSaveSettings();
            }}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${
              emailDigest ? 'bg-blue-600' : 'bg-slate-300'
            }`}
            aria-label="Toggle Weekly Email Digest"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                emailDigest ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Units Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-50">
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Unit System</h4>
            <p className="text-xs text-slate-500">Kilograms/Centimeters vs Pounds/Inches</p>
          </div>
          <select
            value={unitSystem}
            onChange={(e) => {
              setUnitSystem(e.target.value);
              handleSaveSettings();
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 self-start sm:self-auto shrink-0"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, in)</option>
          </select>
        </div>

        {/* Theme Preference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-50">
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Visual Theme</h4>
            <p className="text-xs text-slate-500">Appearance style</p>
          </div>
          <select
            value={themeMode}
            onChange={(e) => {
              setThemeMode(e.target.value);
              handleSaveSettings();
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 self-start sm:self-auto shrink-0"
          >
            <option value="light">Light Surface (Default)</option>
            <option value="dark">Dark Accent (Preview)</option>
          </select>
        </div>
      </div>

      {/* About FitTrack AI */}
      <div className="card space-y-3 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">About FitTrack AI</h3>
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono">v1.0.0 Production Release</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          FitTrack AI is a modern personal health and workout tracking suite. Designed for seamless daily logging, real-time macro monitoring, and goal tracking.
        </p>
      </div>

      {/* Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Update Account Password"
      >
        <form onSubmit={handlePasswordUpdateSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Current Password</label>
            <input type="password" required className="input-field" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">New Password</label>
            <input type="password" required className="input-field" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Confirm New Password</label>
            <input type="password" required className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full py-2.5 text-xs sm:text-sm font-bold mt-2">
            Save New Password
          </button>
        </form>
      </Modal>
    </div>
  );
}
