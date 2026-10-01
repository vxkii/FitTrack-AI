import React from 'react';
import { Dumbbell, Utensils, Footprints, Award, Clock } from 'lucide-react';

export default function ActivityItem({ title, time, detail, category }) {
  const iconMap = {
    workout: { icon: Dumbbell, bg: 'bg-blue-50 text-blue-600' },
    meal: { icon: Utensils, bg: 'bg-amber-50 text-amber-600' },
    steps: { icon: Footprints, bg: 'bg-purple-50 text-purple-600' },
    goal: { icon: Award, bg: 'bg-emerald-50 text-emerald-600' }
  };

  const config = iconMap[category] || iconMap.workout;
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
      <div className={`p-2.5 rounded-xl ${config.bg} shrink-0 mt-0.5`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-900 leading-snug">{title}</h4>
        {detail && <p className="text-xs text-slate-500 mt-0.5">{detail}</p>}
      </div>
      <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0 font-medium">
        <Clock className="w-3 h-3" />
        <span>{time}</span>
      </div>
    </div>
  );
}
