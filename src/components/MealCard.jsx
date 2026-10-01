import React from 'react';
import { Coffee, Utensils, Apple, Pizza, Flame } from 'lucide-react';

const iconMap = {
  Coffee: Coffee,
  Utensils: Utensils,
  Apple: Apple,
  Pizza: Pizza
};

export default function MealCard({ meal }) {
  const IconComponent = iconMap[meal.icon] || Utensils;

  const typeColor = {
    Breakfast: 'bg-amber-50 text-amber-700 border-amber-200',
    Lunch: 'bg-blue-50 text-blue-700 border-blue-200',
    Snack: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Dinner: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <div className="card hover:border-slate-300 transition-all duration-200 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3.5 sm:p-4 min-w-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-100 text-slate-700 shrink-0">
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${typeColor[meal.type] || 'bg-slate-100 text-slate-700'}`}>
              {meal.type}
            </span>
            <span className="text-xs text-slate-400">{meal.time}</span>
          </div>
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">{meal.name}</h4>
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-500 mt-1 flex-wrap">
            <span>P: <strong className="text-blue-600">{meal.protein}g</strong></span>
            <span>C: <strong className="text-emerald-600">{meal.carbs}g</strong></span>
            <span>F: <strong className="text-amber-600">{meal.fat}g</strong></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <div className="text-right">
          <div className="flex items-center gap-1 text-slate-900 font-extrabold text-sm sm:text-base">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{meal.calories}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">kcal</span>
        </div>
      </div>
    </div>
  );
}
