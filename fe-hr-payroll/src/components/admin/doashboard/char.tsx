import React from "react";
import '../../../styles/chart.scss'
import { LineChart, Line, XAxis,  AreaChart,YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
const data = [
  { name: "0", Profits: 1, Expenses: 5 },
  { name: "1", Profits: 14, Expenses: 2 },
  { name: "2", Profits: 5, Expenses: 10 },
  { name: "3", Profits: 4, Expenses: 1 },
  { name: "4", Profits: 5, Expenses: 9 },
  { name: "5", Profits: 1, Expenses: 5 },
  { name: "6", Profits: 14, Expenses: 2 },
  { name: "7", Profits: 5, Expenses: 10 },
  { name: "8", Profits: 5, Expenses: 8 }

];

const ChartTable = () => {
  return (
       <div className="chart">
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeWidth={1}/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="linear" dataKey="Profits"  strokeWidth="2" fill="rgb(187,250,230)" stroke="#54deb1" dot={{ stroke: '#54deb1', strokeWidth: 4, fill: '#54deb1', r: 4 }} activeDot={{ stroke: '#54deb1', strokeWidth: 2, r: 6, fill: '#54deb1' }} />
          <Area  type="linear" dataKey="Expenses" strokeWidth="2" fill="rgb(111,198,171)" stroke="#34a782" dot={{ stroke: '#34a782', strokeWidth: 4, fill: '#34a782', r: 4 }} activeDot={{ stroke: '#34a782', strokeWidth: 2, r: 6, fill: '#34a782' }}  />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartTable