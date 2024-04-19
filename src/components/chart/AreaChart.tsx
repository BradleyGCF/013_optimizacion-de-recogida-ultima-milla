import { Typography } from "@mui/material"
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { chartMockData } from './chart-mock-data'

const AreaChartComponent = () => {
    return (
        <ResponsiveContainer width='98%' height={500}>
            <AreaChart data={chartMockData}>
                <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0062BC" stopOpacity={1.5}/>
                        <stop offset="95%" stopColor="#00294F" stopOpacity={1.0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey='name' tick={{ fill: '#FFFFFF' }} axisLine={false} padding={{left: 20}} />
                <YAxis tick={{ fill: '#FFFFFF' }} axisLine={false} domain={[10, 80]} tickCount={8} padding={{bottom: 20, top: 30}}/>
                <Area
                    dataKey='qty'
                    fill="url(#colorGradient)"
                    stroke="none"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartComponent
