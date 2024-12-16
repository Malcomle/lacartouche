import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

const CustomLineChart = () => {
  const { t } = useTranslation();

  const data = [
    { name: t('lineChart.months.jul'), value: 0 },
    { name: t('lineChart.months.aug'), value: 50 },
    { name: t('lineChart.months.sep'), value: 150 },
    { name: t('lineChart.months.oct'), value: 200 },
    { name: t('lineChart.months.nov'), value: 350 },
    { name: t('lineChart.months.dec'), value: 500 },
  ];

  return (
    <LineChart
      width={700} 
      height={300} 
      data={data}
      margin={{ top: 20, right: 20, left: 30, bottom: 20 }}
    >
      <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={{ fill: '#000', fontWeight: 'bold' }} />
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