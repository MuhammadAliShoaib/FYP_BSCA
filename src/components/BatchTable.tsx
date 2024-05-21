import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../config/redux/hooks.tsx";
import { Product } from "../types/types.ts";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#141925",
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BatchTable() {
  const { auth } = useAppSelector((state) => state.auth);
  const [batches, setBatches] = useState<Product[]>([]);

  const getBatches = async () => {
    try {
      const response = await axios.get(`/api/manufacturer/medicineBatches`, {
        params: { manufacturer: auth.address },
      });
      setBatches(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Medicine</StyledTableCell>
              <StyledTableCell>Dosage</StyledTableCell>
              <StyledTableCell>Active Ingredient</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>MFG</StyledTableCell>
              <StyledTableCell>Expiry</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {batches.map((product) =>
              product.medicineBatches.map((batch) => (
                <StyledTableRow key={batch.batchId}>
                  <StyledTableCell component="th" scope="row">
                    {batch.batchId}
                  </StyledTableCell>
                  <StyledTableCell>{product.completeName}</StyledTableCell>
                  <StyledTableCell>{product.dosage}</StyledTableCell>
                  <StyledTableCell>{product.activeIngredient}</StyledTableCell>
                  <StyledTableCell>{batch.totalSupply}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(batch.mfg).toLocaleDateString("en-GB")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {new Date(batch.exp).toLocaleDateString("en-GB")}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

{
  /* <StyledTableCell>{product.courier}</StyledTableCell> */
}
