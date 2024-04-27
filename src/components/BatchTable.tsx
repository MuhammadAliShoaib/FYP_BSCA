import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#141925",
    color: theme.palette.common.white,
    textAlign:'center'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign:'center'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    id:"MED-PAN-1-13092023",
    manufactuter:"Medios",
    distributor : "Muhammad",
    courier : "Ali",
    medicine:"Panadol",
    quantity : 100,
    batchTokeId:10,
    expiry  : "13/09/2024",
    mfg  : "13/09/2024",
    sold : 0,
    created : "13/09/2024",
  },
  {
    id:"MED-PAN-1-06112023",
    manufactuter:"Medios",
    distributor : "Muhammad",
    courier : "Ali",
    medicine:"Panadol",
    quantity : 1000,
    batchTokeId:13,
    expiry  : "13/09/2024",
    mfg  : "13/09/2024",
    sold : 0,
    created : "13/09/2024",
  },
];

export default function BatchTable() {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Medicine</StyledTableCell>
              <StyledTableCell>Manufacturer</StyledTableCell>
              <StyledTableCell>Distributor</StyledTableCell>
              <StyledTableCell>Courier</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Expiry</StyledTableCell>
              <StyledTableCell>MFG</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.medicine}</StyledTableCell>
                <StyledTableCell>{row.manufactuter}</StyledTableCell>
                <StyledTableCell>{row.distributor}</StyledTableCell>
                <StyledTableCell>{row.courier}</StyledTableCell>
                <StyledTableCell>{row.quantity}</StyledTableCell>
                <StyledTableCell>{row.expiry}</StyledTableCell>
                <StyledTableCell>{row.mfg}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}