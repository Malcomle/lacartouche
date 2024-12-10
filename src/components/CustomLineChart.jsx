import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Données d'exemple, vous pouvez les ajuster en fonction de vos besoins
const data = [
  { name: 'JUL', value: 0 },
  { name: 'AUG', value: 50 },
  { name: 'SEP', value: 150 },
  { name: 'OCT', value: 200 },
  { name: 'NOV', value: 350 },
  { name: 'DEC', value: 500 },
];

const CustomLineChart = () => {
  return (
    <LineChart
      width={700} // Ajustez la largeur
      height={300} // Ajustez la hauteur
      data={data}
      margin={{ top: 20, right: 20, left: 30, bottom: 20 }}
    >
      <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={{ fill: '#000', fontWeight: 'bold' }}/>
      <YAxis 
        tick={{ fill: '#555', fontWeight: 'bold' }}
        tickFormatter={(value) => `${value}€`}
      />
      <Tooltip formatter={(value) => `${value}€`} />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="#3f51b5" 
        strokeWidth={3}
        dot={false} 
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default CustomLineChart;