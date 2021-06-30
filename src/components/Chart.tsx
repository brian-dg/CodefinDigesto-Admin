import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time:any, amount:any) {
  return { time, amount };
}

const data = [
  createData('Decretos', 2),
  createData('Ordenanzas', 11),
  createData('Resoluciones Interna', 0),
  createData('Declaraciones', 0),
  createData('Minutas', 0),
  createData('Notas', 0),
  
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Hoy</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Cantidad
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}