import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const defaultWeeklyData = [
  { day: 'Mon', calories: 420, duration: 45, exercises: 8 },
  { day: 'Tue', calories: 320, duration: 35, exercises: 6 },
  { day: 'Wed', calories: 510, duration: 55, exercises: 10 },
  { day: 'Thu', calories: 280, duration: 30, exercises: 5 },
  { day: 'Fri', calories: 580, duration: 60, exercises: 12 },
  { day: 'Sat', calories: 250, duration: 25, exercises: 4 },
  { day: 'Sun', calories: 380, duration: 40, exercises: 7 }
];

export default function WeeklyProgressChart({ data }) {
  const chartData = data && Array.isArray(data) && data.length > 0 ? data : defaultWeeklyData;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="day" stroke="#64748B" fontSize={12} fontWeight={600} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="caloriesAxis"
            orientation="left"
            stroke="#3B82F6"
            fontSize={11}
            fontWeight={600}
            tickLine={false}
            axisLine={false}
            unit=" kcal"
          />
          <YAxis
            yAxisId="durationAxis"
            orientation="right"
            stroke="#10B981"
            fontSize={11}
            fontWeight={600}
            tickLine={false}
            axisLine={false}
            unit=" min"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#1E293B',
              borderRadius: '14px',
              color: '#FFFFFF',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
              fontSize: '12px',
              fontWeight: 600,
              padding: '10px 14px'
            }}
            formatter={(value, name) => {
              if (name === 'Calories (kcal)') return [`${value} kcal`, 'Calories Burned'];
              if (name === 'Workout (min)') return [`${value} min`, 'Workout Duration'];
              return [value, name];
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '12px', fontWeight: 600 }} />
          <Area
            yAxisId="caloriesAxis"
            type="monotone"
            dataKey="calories"
            name="Calories (kcal)"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 6, fill: '#2563EB' }}
            fillOpacity={1}
            fill="url(#colorCalories)"
          />
          <Area
            yAxisId="durationAxis"
            type="monotone"
            dataKey="duration"
            name="Workout (min)"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 6, fill: '#059669' }}
            fillOpacity={1}
            fill="url(#colorDuration)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
