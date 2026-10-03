import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';

export default function WeightChart({ data, targetWeight = null }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-72 flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-400 font-semibold">
        No weight history check-ins logged yet.
      </div>
    );
  }

  const hasTarget = targetWeight != null && !isNaN(Number(targetWeight)) && Number(targetWeight) > 0;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="period"
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={['dataMin - 1', 'dataMax + 1']}
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E2E8F0',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              fontSize: '12px',
              fontWeight: '600'
            }}
            formatter={(value) => [`${value} kg`, 'Bi-Weekly Weight']}
            labelFormatter={(label) => `Cycle: ${label}`}
          />
          {hasTarget && (
            <ReferenceLine
              y={Number(targetWeight)}
              label={{ value: `Target Goal: ${targetWeight} kg`, fill: '#10B981', fontSize: 11, position: 'top' }}
              stroke="#10B981"
              strokeDasharray="4 4"
            />
          )}
          <Line
            type="monotone"
            dataKey="weight"
            name="2-Week Weight (kg)"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: '#3B82F6', r: 6, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 8, stroke: '#1D4ED8', strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
