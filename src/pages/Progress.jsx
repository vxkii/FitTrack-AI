import React, { useState, useEffect } from 'react';
import { Scale, HeartPulse, Award, TrendingUp, Info, Flame, Calendar, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import WeightChart from '../components/charts/WeightChart';
import WorkoutFrequencyChart from '../components/charts/WorkoutFrequencyChart';
import CaloriesChart from '../components/charts/CaloriesChart';
import Modal from '../components/Modal';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { initialProgress } from '../data/progress';
import {
  subscribeToWorkoutHistory,
  subscribeToMealHistory,
  subscribeToWeightHistory,
  subscribeToUserProfile,
  saveWeightCheckInToFirestore,
  calculateWeeklyActivity,
  calculateBiWeeklyWorkoutFrequency,
  calculateDisciplineScore
} from '../services/firebaseAuth';

export default function Progress() {
  const { user: authUser } = useAuth();
  const { showToast } = useToast();
  const [progressData, setProgressData] = useState(initialProgress);
  const [userProfile, setUserProfile] = useState(null);
  const [weightHistory, setWeightHistory] = useState([]);
  const [mealHistory, setMealHistory] = useState([]);
  const [rawWorkoutHistory, setRawWorkoutHistory] = useState([]);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [newCheckInWeight, setNewCheckInWeight] = useState('');

  // Realtime subscription for Daily Energy Expenditure & Bi-Weekly Workout Frequency
  useEffect(() => {
    const uid = authUser?.uid || auth.currentUser?.uid;
    if (!uid) {
      const emptyWeekly = calculateWeeklyActivity([]);
      const emptyBiWeekly = calculateBiWeeklyWorkoutFrequency([]);
      setProgressData((prev) => ({
        ...prev,
        caloriesBurnedHistory: emptyWeekly.map((item) => ({ day: item.day, burned: 0 })),
        biWeeklyWorkoutFrequency: emptyBiWeekly
      }));
      return;
    }

    const unsubscribe = subscribeToWorkoutHistory(uid, (history) => {
      setRawWorkoutHistory(history);
      const weekly = calculateWeeklyActivity(history);
      const caloriesHistory = weekly.map((item) => ({
        day: item.day,
        burned: item.calories
      }));
      const biWeeklyFreq = calculateBiWeeklyWorkoutFrequency(history);

      setProgressData((prev) => ({
        ...prev,
        caloriesBurnedHistory: caloriesHistory,
        biWeeklyWorkoutFrequency: biWeeklyFreq
      }));
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [authUser?.uid]);

  // Realtime subscription for User Profile, Weight History, and Meal History
  useEffect(() => {
    const uid = authUser?.uid || auth.currentUser?.uid;
    if (!uid) return;

    const unsubProfile = subscribeToUserProfile(uid, (pData) => {
      setUserProfile(pData);
    });

    const unsubWeight = subscribeToWeightHistory(uid, (wHistory) => {
      setWeightHistory(wHistory);
    });

    const unsubMeals = subscribeToMealHistory(uid, (mHistory) => {
      setMealHistory(mHistory);
    });

    return () => {
      if (typeof unsubProfile === 'function') unsubProfile();
      if (typeof unsubWeight === 'function') unsubWeight();
      if (typeof unsubMeals === 'function') unsubMeals();
    };
  }, [authUser?.uid]);

  // Calculate Real Discipline Score
  const { score: disciplineScore, badgeText: disciplineBadgeText } = calculateDisciplineScore(
    rawWorkoutHistory,
    mealHistory,
    weightHistory
  );

  // Dynamic Weight Metric Calculations
  const hasWeightHistory = weightHistory && weightHistory.length > 0;
  
  // 1. Current Weight: Latest check-in, else profile.weight
  const currentWeightVal = hasWeightHistory
    ? Number(weightHistory[weightHistory.length - 1].weight)
    : (userProfile?.weight != null && !isNaN(Number(userProfile.weight)) && Number(userProfile.weight) > 0
      ? Number(userProfile.weight)
      : null);
  const currentWeightDisplay = currentWeightVal != null ? String(currentWeightVal) : '--';

  // 2. Starting Weight: profile.startingWeight, else earliest check-in
  const startingWeightVal = userProfile?.startingWeight != null && !isNaN(Number(userProfile.startingWeight)) && Number(userProfile.startingWeight) > 0
    ? Number(userProfile.startingWeight)
    : (hasWeightHistory ? Number(weightHistory[0].weight) : null);
  const startingWeightDisplay = startingWeightVal != null ? String(startingWeightVal) : '--';

  // 3. Total Weight Change = currentWeight - startingWeight
  let totalWeightChangeVal = null;
  let totalWeightChangeDisplay = '--';
  if (currentWeightVal != null && startingWeightVal != null) {
    const diff = +(currentWeightVal - startingWeightVal).toFixed(1);
    totalWeightChangeVal = diff;
    totalWeightChangeDisplay = diff > 0 ? `+${diff}` : `${diff}`;
  }

  // 4. Latest 2-Week Weight Delta
  let biWeeklyWeightChangeDisplay = '--';
  let biWeeklyWeightChangeVal = 0;
  if (weightHistory && weightHistory.length >= 2) {
    const latest = Number(weightHistory[weightHistory.length - 1].weight);
    const prev = Number(weightHistory[weightHistory.length - 2].weight);
    const delta = +(latest - prev).toFixed(1);
    biWeeklyWeightChangeVal = delta;
    biWeeklyWeightChangeDisplay = delta > 0 ? `+${delta} kg in last 2 wks` : `${delta} kg in last 2 wks`;
  } else if (weightHistory && weightHistory.length === 1) {
    biWeeklyWeightChangeDisplay = 'Baseline logged';
  }

  // 5. Target Weight
  const targetWeightVal = userProfile?.targetWeight != null && !isNaN(Number(userProfile.targetWeight)) && Number(userProfile.targetWeight) > 0
    ? Number(userProfile.targetWeight)
    : (userProfile?.weightGoal != null && !isNaN(Number(userProfile.weightGoal)) && Number(userProfile.weightGoal) > 0
      ? Number(userProfile.weightGoal)
      : null);

  // 6. Bi-Weekly Weight History Chart Data (Real entries only)
  const biWeeklyWeightChartData = weightHistory.map((item, idx) => {
    const w = Number(item.weight);
    let lbl = 'Baseline';
    if (idx > 0) {
      const prevW = Number(weightHistory[idx - 1].weight);
      const d = +(w - prevW).toFixed(1);
      lbl = `${d >= 0 ? '+' : ''}${d} kg`;
    }
    return {
      period: item.period || `Week ${idx * 2}`,
      weight: w,
      label: lbl
    };
  });

  const handleLogCheckIn = async (e) => {
    e.preventDefault();
    const parsedWeight = parseFloat(newCheckInWeight);
    if (!parsedWeight || parsedWeight <= 0) return;

    const uid = authUser?.uid || auth.currentUser?.uid;
    if (!uid) {
      showToast('error', 'Please log in to save check-in.');
      return;
    }

    try {
      const nextWeekNum = weightHistory.length * 2;
      const res = await saveWeightCheckInToFirestore(uid, {
        weight: parsedWeight,
        period: `Week ${nextWeekNum}`
      });

      if (res?.success) {
        showToast(
          'success',
          `2-Week Weight Check-In Logged: ${parsedWeight} kg!`
        );
      } else {
        showToast('error', res?.message || 'Failed to save check-in.');
      }
    } catch (err) {
      console.error('Error saving weight check-in:', err);
      showToast('error', 'Error saving weight check-in.');
    } finally {
      setNewCheckInWeight('');
      setIsCheckInModalOpen(false);
    }
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
              Bi-Weekly Discipline Score: <span className="text-emerald-400">{disciplineScore}%</span> 🔥
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Weighing yourself every 2 weeks ensures maximum discipline and prevents daily fluctuations from causing stress.
              Latest 2-week weight delta: <strong className="text-emerald-400">{biWeeklyWeightChangeDisplay}</strong>.
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
          value={currentWeightDisplay}
          unit={currentWeightVal != null ? "kg" : ""}
          subtitle="Latest bi-weekly check-in"
          trend={biWeeklyWeightChangeDisplay !== '--' ? biWeeklyWeightChangeDisplay : undefined}
          trendType={biWeeklyWeightChangeVal <= 0 ? "down" : "up"}
          icon={Scale}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Starting Weight"
          value={startingWeightDisplay}
          unit={startingWeightVal != null ? "kg" : ""}
          subtitle="Baseline measurement"
          icon={Award}
          iconBg="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Total Weight Change"
          value={totalWeightChangeDisplay}
          unit={totalWeightChangeVal != null ? "kg" : ""}
          subtitle={targetWeightVal != null ? `Progress towards ${targetWeightVal} kg` : "Overall mass change"}
          icon={TrendingUp}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Discipline Score"
          value={`${disciplineScore}%`}
          badgeText={disciplineBadgeText}
          subtitle="2-Week Activity Rate"
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
          <p className="text-xs text-slate-500 mb-4">
            {targetWeightVal != null ? `Body mass progression vs ${targetWeightVal} kg target` : 'Recorded bi-weekly weight check-ins'}
          </p>
          <WeightChart data={biWeeklyWeightChartData} targetWeight={targetWeightVal} />
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
              placeholder={currentWeightVal != null ? `Previous: ${currentWeightVal} kg` : "Enter current weight"}
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
