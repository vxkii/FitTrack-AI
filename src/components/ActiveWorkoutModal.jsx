import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Trophy,
  Flame,
  Clock,
  Sparkles,
  X,
  Dumbbell,
  Check,
  Award
} from 'lucide-react';
import { auth } from '../services/firebase';
import { saveWorkoutHistoryToFirestore } from '../services/firebaseAuth';

export default function ActiveWorkoutModal({ isOpen, onClose, workout }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [completedSets, setCompletedSets] = useState({});
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [hasSavedHistory, setHasSavedHistory] = useState(false);

  // Reset state when a new workout session opens
  useEffect(() => {
    if (isOpen) {
      setCurrentExerciseIndex(0);
      setSecondsElapsed(0);
      setIsTimerRunning(true);
      setCompletedSets({});
      setCompletedExercises([]);
      setIsFinished(false);
      setHasSavedHistory(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, workout]);

  // Automatically save workout history to Firestore under users/{uid}/workoutHistory/{workoutId}
  useEffect(() => {
    if (isFinished && !hasSavedHistory && workout) {
      setHasSavedHistory(true);
      const totalCompletedSets = Object.values(completedSets).reduce(
        (acc, setsArr) => acc + setsArr.length,
        0
      );

      const uid = auth.currentUser?.uid;

      const historyData = {
        workoutId: workout.id || `w_${Date.now()}`,
        workoutName: workout.name || 'Workout',
        category: workout.category || 'General',
        difficulty: workout.difficulty || 'Intermediate',
        exercisesCompleted: Math.max(completedExercises.length, 1),
        setsCompleted: Math.max(totalCompletedSets, 1),
        duration: secondsElapsed,
        calories: workout.calories || 300
      };

      if (uid) {
        saveWorkoutHistoryToFirestore(uid, historyData).then((res) => {
          if (res?.success) {
            console.log(`Workout history saved to Firestore at users/${uid}/workoutHistory/${res.workoutId}`);
          }
        });
      }
    }
  }, [isFinished, hasSavedHistory, workout, completedExercises, completedSets, secondsElapsed]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isOpen && isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning, isFinished]);

  if (!isOpen || !workout) return null;

  const exercises = workout.exercises || [];
  const totalExercises = exercises.length;
  const currentExercise = exercises[currentExerciseIndex] || {};
  const isLastExercise = currentExerciseIndex === totalExercises - 1;

  // Format seconds to MM:SS
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle individual set completion
  const toggleSet = (exIdx, setNum) => {
    setCompletedSets((prev) => {
      const currentSets = prev[exIdx] || [];
      const updatedSets = currentSets.includes(setNum)
        ? currentSets.filter((s) => s !== setNum)
        : [...currentSets, setNum];

      // Auto mark exercise complete if all sets are done
      const requiredSetsCount = currentExercise.sets || 3;
      if (updatedSets.length >= requiredSetsCount) {
        if (!completedExercises.includes(exIdx)) {
          setCompletedExercises((prevEx) => [...prevEx, exIdx]);
        }
      }

      return {
        ...prev,
        [exIdx]: updatedSets
      };
    });
  };

  const isSetCompleted = (exIdx, setNum) => {
    return completedSets[exIdx]?.includes(setNum) || false;
  };

  const handleNextExercise = () => {
    // Mark current exercise as completed if not already
    if (!completedExercises.includes(currentExerciseIndex)) {
      setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
    }

    if (isLastExercise) {
      setIsFinished(true);
      setIsTimerRunning(false);
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
    }
  };

  const handleFinishEarly = () => {
    // Mark at least current exercise as finished
    if (!completedExercises.includes(currentExerciseIndex)) {
      setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
    }
    setIsFinished(true);
    setIsTimerRunning(false);
  };

  // Calculate overall progress percentage
  const progressPercent = totalExercises > 0
    ? Math.round((completedExercises.length / totalExercises) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-[calc(100vw-24px)] sm:w-[90vw] lg:w-full lg:max-w-[720px] max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="p-2 bg-blue-600/30 rounded-xl border border-blue-500/30 text-blue-400 shrink-0">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block truncate">
                Active Workout Session
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white truncate leading-tight">
                {workout.name}
              </h3>
            </div>
          </div>

          {/* Right Header Actions (Timer & Exit) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Session Timer Badge */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="font-mono font-bold text-sm sm:text-base text-white">
                {formatTime(secondsElapsed)}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 text-slate-300 hover:text-white rounded-md hover:bg-slate-700 transition-colors ml-1"
                title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Close session"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isFinished ? (
          <div className="flex flex-col flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Workout Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <span>Progress: {progressPercent}%</span>
                <span>{completedExercises.length} of {totalExercises} Exercises Completed</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(progressPercent, 5)}%` }}
                />
              </div>
            </div>

            {/* Current Exercise Banner Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/20">
                    Exercise {currentExerciseIndex + 1} of {totalExercises}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
                    {workout.category}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
                  {currentExercise.name}
                </h2>

                {currentExercise.targetMuscles && (
                  <p className="text-xs text-blue-400 font-semibold mb-3">
                    Target Muscles: {currentExercise.targetMuscles}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl font-semibold">
                    <Dumbbell className="w-4 h-4 text-blue-400" />
                    <span>{currentExercise.sets || 3} Sets</span>
                  </div>
                  {currentExercise.reps && (
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{currentExercise.reps}</span>
                    </div>
                  )}
                  {currentExercise.duration && (
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl font-semibold">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Target: {currentExercise.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Sets Tracker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Set Tracker ({completedSets[currentExerciseIndex]?.length || 0} / {currentExercise.sets || 3} completed)
                </h4>
                <span className="text-xs text-slate-400">Click set to mark complete</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Array.from({ length: currentExercise.sets || 3 }).map((_, i) => {
                  const setNum = i + 1;
                  const completed = isSetCompleted(currentExerciseIndex, setNum);
                  return (
                    <button
                      key={setNum}
                      onClick={() => toggleSet(currentExerciseIndex, setNum)}
                      className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-between transition-all ${completed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      <span>Set {setNum}</span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${completed ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-transparent'
                          }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timer & Controls Bar */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="btn-primary py-2 px-4 text-xs flex items-center gap-2"
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause Session
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Resume Session
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSecondsElapsed(0)}
                  className="btn-outline py-2 px-3 text-xs flex items-center gap-1.5"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Time</span>
                </button>
              </div>

              <button
                onClick={handleFinishEarly}
                className="text-xs text-slate-500 font-bold hover:text-slate-800 transition-colors"
              >
                Finish Workout Early
              </button>
            </div>

            {/* Footer Navigation Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                onClick={handlePreviousExercise}
                disabled={currentExerciseIndex === 0}
                className={`btn-outline py-2.5 px-4 text-xs font-bold flex items-center gap-2 ${currentExerciseIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Exercise
              </button>

              <button
                onClick={handleNextExercise}
                className="btn-primary py-2.5 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <span>{isLastExercise ? 'Finish Workout' : 'Next Exercise'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Workout Completion Summary View */
          <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6 animate-fade-in overflow-y-auto">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/20 text-amber-900 mx-auto">
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div className="absolute -top-1 -right-1 p-2 bg-blue-600 rounded-full text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 mb-2">
                <Award className="w-3.5 h-3.5" /> Session Completed!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Great Job!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
                You successfully completed <strong className="text-slate-800">{workout.name}</strong>.
              </p>
            </div>

            {/* Summary Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col items-center">
                <Clock className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-400">Total Time</span>
                <span className="font-extrabold text-sm sm:text-base text-slate-900">{formatTime(secondsElapsed)}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col items-center">
                <Flame className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-[11px] font-semibold text-slate-400">Est. Calories</span>
                <span className="font-extrabold text-sm sm:text-base text-amber-600">{workout.calories} kcal</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col items-center col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-400">Exercises</span>
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  {completedExercises.length}/{totalExercises}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-primary w-full max-w-md py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <span>Back to Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
