'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CountryChartProps {
  data: Record<string, number>;
}

const countryFlags: Record<string, string> = {
  BR: '🇧🇷',
  CA: '🇨🇦',
  US: '🇺🇸',
  FR: '🇫🇷',
  ES: '🇪🇸',
  PT: '🇵🇹',
  IT: '🇮🇹',
  DE: '🇩🇪',
  GB: '🇬🇧',
  AR: '🇦🇷',
  MX: '🇲🇽',
  CL: '🇨🇱',
  CO: '🇨🇴',
};

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#6366f1', '#84cc16', '#ef4444'];

export default function CountryChart({ data }: CountryChartProps) {
  const chartData = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([country, count]) => ({
      name: `${countryFlags[country] || '🌍'} ${country}`,
      count,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="count" radius={[0, 8, 8, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

