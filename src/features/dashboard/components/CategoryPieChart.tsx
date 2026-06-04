"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
    data: { name: string; value: number }[]
}

const COLORS = [
     "#000000",
  "#374151",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
]

export function CategoryPieChart({ data}: Props){
    return (
         <div className="w-full h-80 ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
            >
                {data.map((_, index) => (
                    <Cell 
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
      </ResponsiveContainer>
      </div>
    )
}