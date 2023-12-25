import { useEffect, useState } from "react";
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
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalHospital } from "@mui/icons-material";
import axios from "axios";
import { useAccount } from "wagmi";
import { Medicine } from "../../../types/types";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function BatchForm() {
  const { address } = useAccount();
  const [meds, setMeds] = useState<Medicine[]>([]);

  const getMedicines = async () => {
    try {
      const result = (
        await axios.get(`/api/manufacturer/meds`, {
          params: { manufacturer: address },
        })
      ).data;
      console.log(result);

      setMeds(result);
    } catch (error) {
      console.log(error);
    }
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    getMedicines();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 0,
      mfg: Date,
      exp: Date,
      manufacturer: address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      quantity: Yup.number().required("Enter a Quantity"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/createbatch", {
          name: values.name,
          quantity: values.quantity,
          mfg: values.mfg,
          exp: values.exp,
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
      <Header title="Batch" />
      <Box
        mt={10}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        // minHeight={"90vh"}
        sx={{ flexGrow: 1 }}
      >
        <Container
          style={{
            minWidth: "55%",
            minHeight: "25vh",
            display: "flex",
            alignItems: "center",
            paddingTop: "35px",
            paddingBottom: "35px",
            backgroundColor: "white",
            borderTop: "2px solid black",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Box width={"100%"}>
            <Box width={"100%"} ml={2}>
              <h1 style={{ paddingLeft: "15px" }}>Create Batch</h1>
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
                    select
                    name="name"
                    label="Select Medicine"
                    defaultValue={""}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    variant="outlined"
                  >
                    {Array.isArray(meds) &&
                      meds.map((med) => (
                        <MenuItem value={med.name} key={med.name}>
                          <option label={med.name} />
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
                <Box width={"48%"}>
                  <TextField
                    required
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                    variant="outlined"
                  />
                </Box>
                {/* <Box width={"48%"}>
                <TextField
                required
                fullWidth
                select
                name="distributor"
                label="Distributor"
                variant="outlined"
                >
                <MenuItem value="distro">
                <option label="Distro" />
                </MenuItem>
                </TextField>
              </Box> */}
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                mt={5}
              >
                <Box width={"48%"} display={"flex"}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Manufacturing date"
                      format="DD/MM/YYYY"
                      onChange={formik.handleChange}
                      value={formik.values.mfg}
                      disablePast
                    />
                  </LocalizationProvider>
                </Box>
                <Box width={"48%"} display={"flex"}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Expiry"
                      format="DD/MM/YYYY"
                      onChange={formik.handleChange}
                      value={formik.values.exp}
                      disablePast
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  mt={5}
                >
                  <Box width={"48%"}></Box>
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
                      Create
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Container>

        {/* <Container
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
        </Container> */}
      </Box>
    </>
  );
}
