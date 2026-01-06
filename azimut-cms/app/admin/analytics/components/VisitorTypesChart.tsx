'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface VisitorTypesChartProps {
  data: Record<string, number>;
}

const visitorTypeLabels: Record<string, string> = {
  MUSEUM_CURATOR: '🏛️ Museus',
  CITY_OFFICIAL: '🏢 Governo',
  BRAND_MANAGER: '🎯 Marcas',
  FESTIVAL_ORGANIZER: '🎭 Festivais',
  EDUCATIONAL_LEADER: '📚 Educação',
  TECH_ENTHUSIAST: '💻 Tech',
  GENERAL_PUBLIC: '👥 Público Geral',
  UNKNOWN: '❓ Desconhecido',
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#84cc16', '#64748b'];

export default function VisitorTypesChart({ data }: VisitorTypesChartProps) {
  const chartData = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .map(([type, count]) => ({
      name: visitorTypeLabels[type] || type,
      count,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
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

