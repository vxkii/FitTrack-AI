import React, { useState } from 'react';
import { Search, Filter, Play, Sparkles, Dumbbell, Info, X, CheckCircle2 } from 'lucide-react';
import WorkoutCard from '../components/WorkoutCard';
import Modal from '../components/Modal';
import ActiveWorkoutModal from '../components/ActiveWorkoutModal';
import { workoutsData } from '../data/workouts';

export default function Workouts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWorkoutModal, setActiveWorkoutModal] = useState(null);
  const [activeSessionWorkout, setActiveSessionWorkout] = useState(null);

  const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Mobility'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredWorkouts = workoutsData.filter((w) => {
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || w.difficulty === selectedDifficulty;
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-2xl lg:text-3xl text-slate-900">Workouts</h1>
        <p className="text-xs sm:text-sm text-slate-500">Find the right workout routine for your fitness goals.</p>
      </div>

      {/* Featured Full-Body Poster Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" /> Master Routine
              </span>
              <span className="text-xs text-blue-400 font-bold">8 Full-Body Exercises</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              FULL-BODY EXERCISES POSTER ROUTINE
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              The complete 8-exercise full-body strength routine targeting all major muscle groups for maximum endurance and hypertrophy.
            </p>

            {/* Poster 8 Exercise Quick Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {[
                { num: 1, name: 'Squat' },
                { num: 2, name: 'Deadlift' },
                { num: 3, name: 'Bent Over Row' },
                { num: 4, name: 'Iron Cross' },
                { num: 5, name: 'KB Swing' },
                { num: 6, name: 'Cross Push Up' },
                { num: 7, name: 'Bench Dips' },
                { num: 8, name: 'Spider Plank' }
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-left"
                >
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <span className="text-[11px] font-bold text-slate-200 truncate">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-3">
            <button
              onClick={() => setActiveSessionWorkout(workoutsData[0])}
              className="btn-primary w-full py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
            >
              <Play className="w-4 h-4 fill-white" />
              Start Poster Workout Session
            </button>
            <span className="text-[10px] text-center text-slate-400 font-medium">
              Includes full session timer & set logging
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workout by name or muscle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Workouts Grid */}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onStart={(w) => setActiveSessionWorkout(w)}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-slate-500 text-sm font-medium">No workouts found matching your filter criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            className="btn-primary mt-4 py-2 px-4 text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Start Workout Modal */}
      <Modal
        isOpen={!!activeWorkoutModal}
        onClose={() => setActiveWorkoutModal(null)}
        title={activeWorkoutModal?.name || 'Workout Details'}
      >
        {activeWorkoutModal && (
          <div className="space-y-4">
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 block">
                  {activeWorkoutModal.category} • {activeWorkoutModal.difficulty}
                </span>
                <h3 className="font-extrabold text-base text-white">{activeWorkoutModal.name}</h3>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                {activeWorkoutModal.duration} min • {activeWorkoutModal.calories} kcal
              </span>
            </div>
            <p className="text-xs text-slate-600">{activeWorkoutModal.description}</p>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border text-center text-xs">
              <div>
                <span className="text-slate-400 block">Duration</span>
                <span className="font-bold text-slate-900">{activeWorkoutModal.duration} min</span>
              </div>
              <div>
                <span className="text-slate-400 block">Est. Calories</span>
                <span className="font-bold text-amber-600">{activeWorkoutModal.calories} kcal</span>
              </div>
              <div>
                <span className="text-slate-400 block">Difficulty</span>
                <span className="font-bold text-blue-600">{activeWorkoutModal.difficulty}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">
                Exercise Routine ({activeWorkoutModal.exercises.length}):
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {activeWorkoutModal.exercises.map((ex, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-slate-50 p-3 rounded-xl text-xs border border-slate-200/80"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px]">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">
                            {ex.name}
                          </span>
                          {ex.targetMuscles && (
                            <span className="text-[10px] text-slate-400 block">{ex.targetMuscles}</span>
                          )}
                        </div>
                      </div>

                      <span className="text-slate-500 font-medium text-[11px]">{ex.sets} sets • {ex.reps}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveSessionWorkout(activeWorkoutModal);
                setActiveWorkoutModal(null);
              }}
              className="btn-primary w-full py-2.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
            >
              <Play className="w-4 h-4 fill-white" />
              Begin Workout Session
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


