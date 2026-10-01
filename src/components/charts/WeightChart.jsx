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

export default function WeightChart({ data }) {
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
          <ReferenceLine
            y={65.0}
            label={{ value: 'Target Goal: 65 kg', fill: '#10B981', fontSize: 11, position: 'top' }}
            stroke="#10B981"
            strokeDasharray="4 4"
          />
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
