import React, { useState, useEffect } from 'react';
import {
  Scale,
  HeartPulse,
  Dumbbell,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Target,
  Activity,
  Loader2
} from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import WeeklyProgressChart from '../components/charts/WeeklyProgressChart';
import ActivityItem from '../components/ActivityItem';
import Modal from '../components/Modal';
import ActiveWorkoutModal from '../components/ActiveWorkoutModal';
import { initialProgress } from '../data/progress';
import { workoutsData } from '../data/workouts';

export default function Dashboard() {
  const { user: authUser } = useAuth();
  const { showToast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [activeSessionWorkout, setActiveSessionWorkout] = useState(null);
  const featuredWorkout = workoutsData[0]; // Full Body Strength

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        if (isMounted) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        // Read Firestore document from path: users/{firebaseUser.uid}
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (isMounted) {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            // Auto-initialize profile document if missing in Firestore
            const email = firebaseUser.email || '';
            const name = firebaseUser.displayName || (email ? email.split('@')[0] : 'User');
            const defaultProfile = {
              name,
              email,
              age: 25,
              height: 175,
              weight: 70,
              fitnessGoal: 'Build Muscle',
              activityLevel: 'Moderately Active',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            try {
              await setDoc(userDocRef, defaultProfile);
              setProfile(defaultProfile);
            } catch (createErr) {
              console.warn('Could not auto-create missing Firestore profile:', createErr);
              setProfile(defaultProfile);
            }
          }
        }
      } catch (err) {
        console.error('Firestore Dashboard Profile Fetch Error:', err);
        // If Firestore permission denied, suppress intrusive error toast if AuthContext user is present
        if (isMounted) {
          if (!authUser) {
            showToast('error', 'Unable to load your fitness data. Please try again.');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [authUser, showToast]);

  // Combined profile data (Firestore document prioritized, then AuthContext user fallback)
  const profileData = profile || authUser || {};

  // Loading state
  if (loading && !profile && !authUser) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl shadow-lg text-white animate-pulse">
            <Dumbbell className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span>Loading your fitness profile...</span>
        </div>
      </div>
    );
  }

  // Extract Real Firestore Fields
  const name = profileData.name?.trim() || authUser?.name || '--';
  const firstName = name !== '--' ? name.split(' ')[0] : '--';
  const fitnessGoal = profileData.fitnessGoal || authUser?.fitnessGoal || '--';
  const activityLevel = profileData.activityLevel || authUser?.activityLevel || '--';

  // Real Height & Weight
  const rawWeight = profileData.weight != null && !isNaN(Number(profileData.weight)) && Number(profileData.weight) > 0
    ? Number(profileData.weight)
    : (authUser?.weight != null && !isNaN(Number(authUser.weight)) ? Number(authUser.weight) : null);

  const rawHeight = profileData.height != null && !isNaN(Number(profileData.height)) && Number(profileData.height) > 0
    ? Number(profileData.height)
    : (authUser?.height != null && !isNaN(Number(authUser.height)) ? Number(authUser.height) : null);

  const rawAge = profileData.age != null && !isNaN(Number(profileData.age)) && Number(profileData.age) > 0
    ? Number(profileData.age)
    : (authUser?.age != null && !isNaN(Number(authUser.age)) ? Number(authUser.age) : null);

  const weightDisplay = rawWeight !== null ? String(rawWeight) : '--';
  const heightDisplay = rawHeight !== null ? `${rawHeight} cm` : '--';
  const ageDisplay = rawAge !== null ? `${rawAge} yrs` : '--';

  // Calculate Real BMI: BMI = weightKg / (heightMeters * heightMeters)
  let bmiValue = '--';
  let bmiBadge = '--';

  if (rawWeight !== null && rawHeight !== null) {
    const heightMeters = rawHeight / 100;
    const bmiNum = rawWeight / (heightMeters * heightMeters);
    bmiValue = bmiNum.toFixed(1);

    if (bmiNum < 18.5) {
      bmiBadge = 'Underweight';
    } else if (bmiNum < 25) {
      bmiBadge = 'Normal';
    } else if (bmiNum < 30) {
      bmiBadge = 'Overweight';
    } else {
      bmiBadge = 'Obese';
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in min-w-0">
      {/* Welcome Banner */}
      <div className="card bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-0 p-5 sm:p-8 relative overflow-hidden shadow-lg shadow-blue-500/15">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none hidden sm:flex items-center justify-end pr-8">
          <Dumbbell className="w-48 h-48 lg:w-64 lg:h-64 -mr-8 lg:-mr-12" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold mb-3 border border-white/20 text-white">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily Fitness Summary</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2 text-white leading-tight">
            Ready for today's session{firstName !== '--' ? `, ${firstName}` : ''}?
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
            Welcome to your personalized dashboard. Your fitness goal is <strong className="text-white">{fitnessGoal}</strong> with an activity level of <strong className="text-white">{activityLevel}</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSessionWorkout(featuredWorkout)}
              className="bg-white text-blue-700 hover:bg-blue-50 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-blue-700" />
              Start Today's Workout
            </button>
          </div>
        </div>
      </div>

      {/* Real Firestore Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Current Weight */}
        <StatCard
          title="Current Weight"
          value={weightDisplay}
          unit={rawWeight !== null ? "kg" : ""}
          subtitle={`Height: ${heightDisplay}`}
          icon={Scale}
          iconBg="bg-blue-50 text-blue-600"
        />

        {/* 2. Calculated BMI */}
        <StatCard
          title="BMI"
          value={bmiValue}
          badgeText={bmiBadge !== '--' ? bmiBadge : undefined}
          subtitle={`Age: ${ageDisplay}`}
          icon={HeartPulse}
          iconBg="bg-emerald-50 text-emerald-600"
        />

        {/* 3. Fitness Goal */}
        <StatCard
          title="Fitness Goal"
          value={fitnessGoal}
          subtitle="Target Objective"
          icon={Target}
          iconBg="bg-purple-50 text-purple-600"
        />

        {/* 4. Activity Level */}
        <StatCard
          title="Activity Level"
          value={activityLevel}
          subtitle="Lifestyle Factor"
          icon={Activity}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Weekly Progress Chart & Today's Workout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="card lg:col-span-2 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Weekly Progress</h3>
              <p className="text-xs text-slate-500">Track your daily calories burned and workout duration</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
              This Week
            </span>
          </div>
          <div className="min-w-0 w-full overflow-hidden">
            <WeeklyProgressChart data={initialProgress.weeklyActivity} />
          </div>
        </div>

        {/* Today's Featured Workout */}
        <div className="card flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Today's Workout
              </span>
              <span className="text-xs text-slate-400 font-medium">30 min</span>
            </div>

            <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-1">{featuredWorkout.name}</h3>
            <p className="text-xs text-slate-500 mb-4 line-clamp-2">{featuredWorkout.description}</p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="font-semibold">Intermediate</span>
              <span>•</span>
              <span className="font-semibold text-amber-600">320 kcal</span>
              <span>•</span>
              <span className="font-semibold">8 exercises</span>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-slate-700 block">Exercise Preview:</span>
              <div className="grid grid-cols-2 gap-2">
                {['Push-ups', 'Squats', 'Lunges', 'Plank'].map((ex, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/70 p-2 rounded-lg font-medium min-w-0 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveSessionWorkout(featuredWorkout)}
            className="btn-primary w-full py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            Start Workout
          </button>
        </div>
      </div>

      {/* Daily Goals & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Daily Goals Progress */}
        <div className="card space-y-4 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">Daily Goals</h3>
            <span className="text-xs text-slate-400">Sep 23, 2026</span>
          </div>

          <div className="space-y-4">
            <ProgressBar label="Steps" current={7850} max={10000} unit="steps" color="purple" />
            <ProgressBar label="Water" current={1.8} max={2.5} unit="L" color="cyan" />
            <ProgressBar label="Calories" current={1840} max={2200} unit="kcal" color="amber" />
            <ProgressBar label="Workout" current={30} max={45} unit="min" color="green" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">Recent Activity</h3>
            <button className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-0.5">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 divide-y divide-slate-100">
            <ActivityItem
              category="workout"
              title="Completed Full Body Workout"
              detail="30 min • 320 kcal burned"
              time="2 hours ago"
            />
            <ActivityItem
              category="meal"
              title="Logged Lunch: Chicken Rice Bowl"
              detail="650 kcal • 48g Protein"
              time="4 hours ago"
            />
            <ActivityItem
              category="steps"
              title="Completed 8,000 steps goal"
              detail="Daily milestone achieved"
              time="Yesterday"
            />
          </div>
        </div>
      </div>

      {/* Workout Detail Modal */}
      <Modal
        isOpen={!!selectedWorkout}
        onClose={() => setSelectedWorkout(null)}
        title={selectedWorkout?.name || 'Workout Details'}
      >
        {selectedWorkout && (
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
              <img
                src={selectedWorkout.image}
                alt={selectedWorkout.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedWorkout.description}</p>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Duration</span>
                <span className="font-bold text-slate-900">{selectedWorkout.duration} min</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Calories</span>
                <span className="font-bold text-amber-600">{selectedWorkout.calories} kcal</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Level</span>
                <span className="font-bold text-blue-600">{selectedWorkout.difficulty}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900">
                  Exercise List ({selectedWorkout.exercises.length}):
                </h4>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedWorkout.exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl text-xs border border-slate-200/80"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-800">
                        {ex.name}
                      </span>
                    </div>
                    <span className="text-slate-500 font-medium text-[11px] shrink-0">{ex.sets} sets × {ex.reps}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveSessionWorkout(selectedWorkout);
                setSelectedWorkout(null);
              }}
              className="btn-primary w-full py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 mt-2"
            >
              <Play className="w-4 h-4 fill-white" />
              Begin Session Now
            </button>
          </div>
        )}
      </Modal>

      {/* Active Workout Session Runner Modal */}
      <ActiveWorkoutModal
        isOpen={!!activeSessionWorkout}
        onClose={() => setActiveSessionWorkout(null)}
        workout={activeSessionWorkout}
      />
    </div>
  );
}


