import Header from "../../../components/Header";
import {
  Box,
  Button,
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAccount } from "wagmi";

export default function ProductForm() {
  const { address } = useAccount();

  const formik = useFormik({
    initialValues: {
      name: "",
      symbol: "",
      formula: "",
      manufacturer: address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      symbol: Yup.string().required("Symbol is required"),
      formula: Yup.string().required("Formula is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/addproduct", {
          name: values.name,
          symbol: values.symbol,
          formula: values.formula,
          manufacturer: values.manufacturer,
        });

        if (!response) {
          throw new Error("Something Went Wrong!");
        }
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <>
      <Header title="Products" />
      <Box
        mt={10}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        // justifyContent={"center"}
        minHeight={"90vh"}
        sx={{ flexGrow: 1 }}
      >
        <Container
          style={{
            minWidth: "45%",
            minHeight: "22vh",
            display: "flex",
            backgroundColor: "white",
            borderTop: "2px solid black",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Box width={"100%"}>
            <Box width={"100%"} ml={2}>
              <h1 style={{ paddingLeft: "15px" }}>Add Product</h1>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                mt={5}
              >
                <Box width={"48%"}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Box>
                <Box width={"48%"}>
                  <TextField
                    required
                    fullWidth
                    id="symbol"
                    name="symbol"
                    label="Symbol"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.symbol}
                  />
                </Box>
              </Box>
              <Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  mt={5}
                >
                  <Box width={"48%"}>
                    <TextField
                      required
                      fullWidth
                      id="formula"
                      name="formula"
                      label="Formula"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.formula}
                    />
                  </Box>
                  <Box
                    width={"48%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"right"}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "15%",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Container>

        <Container
          style={{
            marginTop: "10px",
            minWidth: "95%",
          }}
        >
          <Box width={"95%"}>
            <h1
              style={{
                paddingLeft: "15px",
                textDecorationLine: "underline",
                textUnderlinePosition: "under",
              }}
            >
              List of Products
            </h1>
          </Box>
          <Box width={"50%"} ml={"15px"} bgcolor={"white"}>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalHospital />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Panadol" secondary="Parcetomol" />
              </ListItem>
            </List>
          </Box>
        </Container>
      </Box>
      <Box sx={{ padding: "25px" }}>
        <Container style={{ marginTop: "20px" }}>
          <Grid container>
            <Grid item md={3}></Grid>

            <Grid
              item
              md={6}
              style={{
                backgroundColor: "white",
                boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                paddingTop: "5px",
                paddingBottom: "10px",
              }}
            >
              <Grid item xs={12}>
                <h1 style={{ paddingLeft: "15px", textAlign: "center" }}>
                  Add Product
                </h1>
              </Grid>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={12} md={6} style={{ marginTop: "10px" }}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ marginTop: "10px" }}>
                  <TextField
                    required
                    // fullWidth
                    id="symbol"
                    name="symbol"
                    label="Symbol"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item md={3}></Grid>
                <Grid item xs={12} md={6} style={{ marginTop: "10px" }}>
                  <TextField
                    required
                    fullWidth
                    id="formula"
                    name="formula"
                    label="Formula"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={3}></Grid>
              </Grid>
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

{
  /* <Grid
            container
            spacing={15}
            style={{
              display: "flex",
 
              marginTop: "35px",
              // alignItems: "center",
            }}
          >
            <Grid item xs={4} md={8}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="symbol"
                name="symbol"
                label="Symbol"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={15}
            style={{
              display: "flex",
 
              marginTop: "35px",
            }}
          >
            <Grid item xs={4} md={8}>
              <TextField
                required
                fullWidth
                id="formula"
                name="formula"
                label="Formula"
                variant="outlined"
              />
              <TextField
                margin="normal"
                fullWidth
                label="submit"
                variant="outlined"
              />
            </Grid>
          </Grid> */
}
