"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 320 },
  { name: "Fev", value: 680 },
  { name: "Mar", value: 1100 },
  { name: "Abr", value: 1900 },
  { name: "Mai", value: 3200 },
  { name: "Jun", value: 5800 },
  { name: "Jul", value: 8200 },
];

export default function StatsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%" style={{ outline: "none" }}>
      <AreaChart data={data} style={{ outline: "none" }}>
        <defs>
          <linearGradient id="colorVizai" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0940D2" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#0940D2" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{
            background: "var(--background)",
            border: "1px solid rgba(127,127,127,0.2)",
            borderRadius: 8,
            fontSize: "0.8rem",
            color: "var(--foreground)",
          }}
          formatter={(v) => [`${Number(v).toLocaleString("pt-BR")} renders`, ""]}
          labelFormatter={(l) => l}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#0940D2"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorVizai)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
