import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Container, Grid, Typography } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useAppSelector } from "../../config/redux/hooks";
import { socket } from "../../socket";
import BatchTable from "../../components/BatchTable";
import { ThemeContext } from "../../config/Context/themeProvider";
import { useContext } from "react";

let start = true;

export default function Dashboard() {
  const { auth } = useAppSelector((state) => state.auth);
  const ctx = useContext(ThemeContext);

  useEffect(() => {
    if (start) {
      console.log("hello");
      socket.emit("newUser", "0xdb95bB2236a7621151ff47C9723101f6DeCFeeC4");
      start = false;
    }
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography
            variant="h2"
            color={ctx.mode === "light" ? "black" : "white"}
          >
            Batches Created By {auth.name}
          </Typography>
        </Container>

        <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <BatchTable />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
