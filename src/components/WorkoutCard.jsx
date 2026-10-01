import React from 'react';
import { Clock, Flame, Dumbbell, Play } from 'lucide-react';

export default function WorkoutCard({ workout, onStart }) {
  const categoryColors = {
    Strength: 'bg-blue-50 text-blue-700 border-blue-200',
    Cardio: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    HIIT: 'bg-rose-50 text-rose-700 border-rose-200',
    Yoga: 'bg-purple-50 text-purple-700 border-purple-200',
    Mobility: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  };

  const difficultyColors = {
    Beginner: 'text-emerald-600 bg-emerald-50',
    Intermediate: 'text-amber-600 bg-amber-50',
    Advanced: 'text-rose-600 bg-rose-50'
  };

  return (
    <div className="card group hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* 2D Vector Anatomical Style Card Header */}
        <div className="relative aspect-[16/9] w-[calc(100%+2rem)] sm:w-[calc(100%+2.5rem)] -ml-4 sm:-ml-5 -mt-4 sm:-mt-5 mb-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 flex flex-col justify-between border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e293b_0%,transparent_70%)] opacity-60" />
          <div className="relative z-10 flex justify-between items-start">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${categoryColors[workout.category] || 'bg-slate-100 text-slate-700'}`}>
              {workout.category}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md ${difficultyColors[workout.difficulty] || 'bg-slate-100 text-slate-700'}`}>
              {workout.difficulty}
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 block mb-0.5">
              2D Anatomical Routine
            </span>
            <h3 className="font-black text-base sm:text-lg leading-tight tracking-tight text-white drop-shadow-sm line-clamp-1">{workout.name}</h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
          {workout.description}
        </p>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2 mb-4 bg-slate-50 rounded-xl px-2 sm:px-3 border border-slate-100 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 min-w-0">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="font-semibold truncate">{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 min-w-0">
            <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-semibold truncate">{workout.calories} kcal</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 min-w-0">
            <Dumbbell className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="font-semibold truncate">{workout.exerciseCount} ex</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onStart && onStart(workout)}
        className="btn-primary w-full py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 group-hover:bg-blue-700 transition-colors"
      >
        <Play className="w-4 h-4 fill-white" />
        Start Workout
      </button>
    </div>
  );
}
