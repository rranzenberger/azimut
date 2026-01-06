'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ScoreDistributionChartProps {
  hot: number;
  warm: number;
  cold: number;
}

const COLORS = ['#dc2626', '#f97316', '#3b82f6'];

export default function ScoreDistributionChart({ hot, warm, cold }: ScoreDistributionChartProps) {
  const data = [
    { name: '🔥 Quentes (>75%)', value: hot },
    { name: '🌡️ Mornos (50-75%)', value: warm },
    { name: '❄️ Frios (<50%)', value: cold },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

