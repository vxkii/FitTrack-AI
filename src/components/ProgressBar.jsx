import React from 'react';

export default function ProgressBar({ current, max, unit = '', label, color = 'blue', showValues = true, size = 'md' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / max) * 100))) || 0;

  const colorMap = {
    blue: 'bg-blue-500 text-blue-600',
    green: 'bg-emerald-500 text-emerald-600',
    amber: 'bg-amber-500 text-amber-600',
    purple: 'bg-purple-500 text-purple-600',
    rose: 'bg-rose-500 text-rose-600',
    cyan: 'bg-cyan-500 text-cyan-600'
  };

  const barHeight = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3';

  return (
    <div className="w-full">
      {(label || showValues) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
          {label && <span className="text-slate-700 font-semibold">{label}</span>}
          {showValues && (
            <span className="text-slate-500 font-medium ml-auto">
              <span className="font-bold text-slate-800">{current}</span> / {max} {unit}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${barHeight} p-0.5 border border-slate-100`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorMap[color]?.split(' ')[0] || 'bg-blue-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
