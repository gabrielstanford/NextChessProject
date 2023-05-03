import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let level = [];
if (typeof window !== 'undefined') {
  console.log('runit')
  if(localStorage.getItem('level') !== null ) {
    console.log('test completed')
    level = JSON.parse(localStorage.getItem('level'));
  }
  // console.log(level[3]) undefined
}

const level0 = 0
const level1 = 0
const level2 = 0
const level3 = 0
const level4 = 0
const level5 = 0
const level6 = 0
const numCorrect = 0;

if(level && level[1] && level[2]) {
const level0 = level[2][0] ? 1 : 0
const level1 = level[2][1] ? 1 : 0
const level2 = level[2][2] ? 1 : 0
const level3 = level[2][3] ? 1 : 0
const level4 = level[2][4] ? 1 : 0
const level5 = level[2][5] ? 1 : 0
const level6 = level[2][6] ? 1 : 0
const numCorrect = level[1]
}

const data = [
  {
    name: 'T',
    puzzles: numCorrect,
  },
  {
    name: '1',
    puzzles: level0,
  },
  {
    name: '2',
    puzzles: level1,
  },
  {
    name: '3',
    puzzles: level2,
  },
  {
    name: '4',
    puzzles: level3,
  },
  {
    name: '5',
    puzzles: level4,
  },
  {
    name: '6',
    puzzles: level5,
  },
  {
    name: '7',
    puzzles: level6,
  },
  
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="puzzles" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
