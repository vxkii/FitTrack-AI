import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, unit, subtitle, trend, trendType, icon: Icon, badgeText, iconBg = 'bg-blue-50 text-blue-600' }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${iconBg} transition-transform duration-300 hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        {unit && <span className="text-sm font-semibold text-slate-500">{unit}</span>}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-xs">
        {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
        {badgeText && (
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
            {badgeText}
          </span>
        )}
        {trend && (
          <span className={`flex items-center gap-1 font-semibold ${
            trendType === 'up' ? 'text-emerald-600' : trendType === 'down' ? 'text-rose-600' : 'text-slate-500'
          }`}>
            {trendType === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
            {trendType === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
            {trendType === 'neutral' && <Minus className="w-3.5 h-3.5" />}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
