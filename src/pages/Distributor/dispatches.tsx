import DispatchTable from "../../components/DispatchTable";
import Header from "../../components/Header";
import { Container, Grid } from "@mui/material";

export default function Dispatches() {
  return (
    <>
      <Header title="Dispatches" />
      <Container style={{ marginTop: "50px" }}>
        <Grid container>
          <Grid item md={12}>
            <DispatchTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
