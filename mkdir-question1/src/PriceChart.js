import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PriceChart({ data }) {
  // data is expected to be an array of objects with date and aggregated price fields
  return (
    <div>
      <h3>Aggregated Stock Prices</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="average" stroke="#8884d8" name="Average Price" />
          <Line type="monotone" dataKey="max" stroke="#82ca9d" name="Max Price" />
          <Line type="monotone" dataKey="min" stroke="#ff7300" name="Min Price" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceChart;
