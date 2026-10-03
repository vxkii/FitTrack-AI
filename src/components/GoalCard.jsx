import React from 'react';
import { Target, Calendar, CheckCircle2, Edit2, Trash2 } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function GoalCard({ goal, onEdit, onDelete }) {
  const isComplete = goal.progress >= 100;

  return (
    <div className="card hover:border-slate-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">{goal.name}</h3>
            <span className="text-xs text-slate-500 font-medium">{goal.category}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {onEdit && (
            <button
              onClick={() => onEdit(goal)}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Edit Goal"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(goal)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Delete Goal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${isComplete
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
              : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}>
            {isComplete ? 'Completed' : `${goal.progress}%`}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-4">{goal.description}</p>

      <div className="mb-4">
        <ProgressBar
          current={goal.current}
          max={goal.target}
          unit={goal.unit}
          color={isComplete ? 'green' : 'blue'}
        />
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Target: <strong className="text-slate-700">{goal.deadline}</strong></span>
        </div>
        {isComplete && (
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Achieved
          </span>
        )}
      </div>
    </div>
  );
}
