import React, { useState } from 'react';
import { Scale, HeartPulse, Award, TrendingUp, Info, Flame, Calendar, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import WeightChart from '../components/charts/WeightChart';
import WorkoutFrequencyChart from '../components/charts/WorkoutFrequencyChart';
import CaloriesChart from '../components/charts/CaloriesChart';
import Modal from '../components/Modal';
import { useToast } from '../context/ToastContext';
import { initialProgress } from '../data/progress';

export default function Progress() {
  const { showToast } = useToast();
  const [progressData, setProgressData] = useState(initialProgress);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [newCheckInWeight, setNewCheckInWeight] = useState('');

  const handleLogCheckIn = (e) => {
    e.preventDefault();
    const parsedWeight = parseFloat(newCheckInWeight);
    if (!parsedWeight || parsedWeight <= 0) return;

    const prevWeight = progressData.currentWeight;
    const diff = +(parsedWeight - prevWeight).toFixed(1);
    const totalChange = +(parsedWeight - progressData.startingWeight).toFixed(1);

    const nextWeekNum = (progressData.biWeeklyWeightHistory.length) * 2;
    const newEntry = {
      period: `Week ${nextWeekNum}`,
      weight: parsedWeight,
      goal: 65.0,
      label: `${diff >= 0 ? '+' : ''}${diff} kg`
    };

    setProgressData((prev) => ({
      ...prev,
      currentWeight: parsedWeight,
      weightChange: totalChange,
      biWeeklyWeightChange: diff,
      disciplineScore: Math.min(prev.disciplineScore + 2, 100),
      streakWeeks: prev.streakWeeks + 2,
      biWeeklyWeightHistory: [...prev.biWeeklyWeightHistory, newEntry]
    }));

    showToast(
      'success',
      `2-Week Weight Check-In Logged! ${diff <= 0 ? `Great discipline! Lost ${Math.abs(diff)} kg in 2 weeks. 🔥` : `Weight logged: ${parsedWeight} kg.`}`
    );

    setNewCheckInWeight('');
    setIsCheckInModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl lg:text-3xl text-slate-900">Bi-Weekly Analytics & Discipline</h1>
          <p className="text-xs sm:text-sm text-slate-500">2-Week interval weight tracking & workout discipline progress.</p>
        </div>

        {/* Bi-Weekly Check-In Action Button */}
        <button
          onClick={() => setIsCheckInModalOpen(true)}
          className="btn-primary py-3 px-5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 self-start sm:self-auto shrink-0"
        >
          <Scale className="w-4 h-4" />
          <span>Log 2-Week Weight Check-In</span>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Bi-Weekly Motivation & Discipline Banner */}
      <div className="card bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-5 sm:p-6 relative overflow-hidden shadow-xl border-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2-Week Discipline Milestone</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Bi-Weekly Discipline Score: <span className="text-emerald-400">{progressData.disciplineScore}%</span> 🔥
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Weighing yourself every 2 weeks ensures maximum discipline and prevents daily fluctuations from causing stress.
              Latest 2-week weight delta: <strong className="text-emerald-400">{progressData.biWeeklyWeightChange} kg</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-md border border-white/10 shrink-0">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
              <Flame className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Consistency Streak</span>
              <span className="text-base font-black text-white">{progressData.streakWeeks} Weeks Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Weight (2-Wk)"
          value={progressData.currentWeight}
          unit="kg"
          subtitle="Latest bi-weekly check-in"
          trend={`${progressData.biWeeklyWeightChange} kg in last 2 wks`}
          trendType={progressData.biWeeklyWeightChange <= 0 ? "down" : "up"}
          icon={Scale}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Starting Weight"
          value={progressData.startingWeight}
          unit="kg"
          subtitle="May 1 baseline"
          icon={Award}
          iconBg="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Total Weight Change"
          value={progressData.weightChange}
          unit="kg"
          badgeText="On Track"
          subtitle="Progress towards 65 kg"
          icon={TrendingUp}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Discipline Score"
          value={`${progressData.disciplineScore}%`}
          badgeText="Highly Disciplined"
          subtitle="2-Week Workout Rate"
          icon={HeartPulse}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Modified 2-Week Interval Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Bi-Weekly Weight History Line Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-900 text-lg">Bi-Weekly Weight History</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              2-Week Interval
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Body mass progression measured every 2 weeks vs 65 kg target line</p>
          <WeightChart data={progressData.biWeeklyWeightHistory} />
        </div>

        {/* Graph 2: Bi-Weekly Workout & Discipline Frequency Bar Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-900 text-lg">Bi-Weekly Workout Frequency</h3>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
              2-Week Blocks
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Completed workouts per 2-week training block vs target goal</p>
          <WorkoutFrequencyChart data={progressData.biWeeklyWorkoutFrequency} />
        </div>

        {/* Daily Calories Expenditure */}
        <div className="card lg:col-span-2">
          <h3 className="font-bold text-slate-900 text-lg mb-1">Daily Energy Expenditure</h3>
          <p className="text-xs text-slate-500 mb-4">Daily calories burned tracking over the current cycle</p>
          <CaloriesChart data={progressData.caloriesBurnedHistory} />
        </div>
      </div>

      {/* Progress & Motivation Insights */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-lg">Bi-Weekly Discipline & Recovery Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progressData.insights.map((insight, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-sm text-slate-900">{insight.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Week Weight Check-In Modal */}
      <Modal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
        title="Log 2-Week Weight Check-In"
      >
        <form onSubmit={handleLogCheckIn} className="space-y-4">
          <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-100 text-xs text-blue-800 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Bi-Weekly Check-in Philosophy</span>
            </div>
            <p>
              Weighing in once every 2 weeks gives an accurate picture of muscle building and fat loss, shielding you from daily water fluctuations.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Measured Weight (kg) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              required
              placeholder={`Previous: ${progressData.currentWeight} kg`}
              value={newCheckInWeight}
              onChange={(e) => setNewCheckInWeight(e.target.value)}
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Save 2-Week Weight & Update Discipline</span>
          </button>
        </form>
      </Modal>
    </div>
  );
}
