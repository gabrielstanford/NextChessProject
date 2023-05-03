import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useRouter} from 'next/router'

// Generate Order Data
function createData(
  id: number,
  name: string,
  timeEstimate: number,
) {
  return { id, name, timeEstimate };
}

const rows = [
  createData(
    0,
    'Double Attack Puzzle Set',
    5,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const router = useRouter();

  function onRowClick() {
    router.push('/double-attack-puzzles');
  }
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Time Estimate (minutes)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell><Link href="/double-attack-puzzles">{row.name}</Link></TableCell>
              <TableCell align="right">{`${row.timeEstimate}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}