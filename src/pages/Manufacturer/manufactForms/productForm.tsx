import Header from "../../../components/Header";
import { Box, Container, Grid, Input } from "@mui/material";

export default function ProductForm() {
  return (
    <>
      <Header title="Add Product" />
      <Box
        mt={3}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        minHeight={"90vh"}
        sx={{ flexGrow: 1, backgroundColor: "burlywood" }}
      >
        <Container
          style={{
            minWidth: "85%",
            display: "flex",
            border: "2px solid black",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              maxWidth: "48%",
              minHeight: "50vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={4}
              md={8}
              className="flexCenter"
              sx={{ backgroundColor: "aliceblue" }}
            >
              <Input placeholder="Name..." />
            </Grid>
            <Grid
              item
              xs={4}
              md={8}
              className="flexCenter"
              sx={{ backgroundColor: "aliceblue" }}
            >
              <Input placeholder="Symbol..." />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              maxWidth: "48%",
              minHeight: "50vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={4}
              md={8}
              className="flexCenter"
              sx={{ backgroundColor: "aliceblue" }}
            >
              <Input placeholder="Formula..." />
            </Grid>
            <Grid
              item
              xs={4}
              md={8}
              className="flexCenter"
              sx={{ backgroundColor: "aliceblue" }}
            >
              <Input placeholder="Submit maybe..." />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
