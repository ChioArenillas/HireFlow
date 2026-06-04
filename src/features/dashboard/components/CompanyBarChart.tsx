"use client"

import { Bar, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip } from "recharts"

interface Props {
    data: {
        name: string
        value: number
    }[]
}
export function CompanyBarChart({ data }: Props){
    return (
        <div className="w-full h-80 ">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />

                    <Bar
                    dataKey="value"
                    fill="#000000"
                    radius={[4, 4, 0, 0]}/>

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}