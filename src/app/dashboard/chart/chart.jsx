"use client"

import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "Sun",
    views: 4000,
    likes: 2400,
  },
  {
    name: "Mon",
    views: 3000,
    likes: 1398,
  },
  {
    name: "Tue",
    views: 3000,
    likes: 2800,
  },
  {
    name: "Wed",
    views: 3780,
    likes: 2708,
  },
  {
    name: "Thu",
    views: 4890,
    likes: 1800,
  },
  {
    name: "Fri",
    views: 3390,
    likes: 2800,
  },
  {
    name: "Sat",
    views: 3490,
    likes: 2300,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background:"#151c2c", border:"none"}}/>
          <Legend />
          <Line type="monotone" dataKey="views" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="likes" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart