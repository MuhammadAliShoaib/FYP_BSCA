import { useState } from "react";
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

export default function DispatchForm() {
  const [inputs, setInputs] = useState([
    {
      type: "number",
      fullWidth: "fullwidth",
      name: "distributor",
      name1: "quantity",
      label: "Distributor",
      label1: "Quantity",
      variant: "outlined",
    },
  ]);

  const handleChange = () => {
    setInputs((prevState) => [
      ...prevState,
      {
        type: "number",
        fullWidth: "fullwidth",
        name: "distributor",
        name1: "quantity",
        label: "Distributor",
        label1: "Quantity",
        variant: "outlined",
      },
    ]);
  };

  return (
    <>
      <Header title="Dispatch" />
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
              <h1 style={{ paddingLeft: "15px" }}>Dispatch Batch</h1>
            </Box>
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
                  name="medicines"
                  label="Select Medicine"
                  defaultValue={""}
                  variant="outlined"
                >
                  <MenuItem value="panadol">
                    <option label="Panadol" />
                  </MenuItem>
                </TextField>
              </Box>
              <Box width={"48%"}>
                <TextField
                  required
                  fullWidth
                  select
                  name="batch"
                  label="Select Batch"
                  variant="outlined"
                >
                  <MenuItem value="batchId">
                    <option label="Batch ID" />
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
            {inputs.map((input, index) => (
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
                    name={input.name}
                    label={input.label}
                    variant="outlined"
                  >
                    <MenuItem value="distro">
                      <option label="Distro" />
                    </MenuItem>
                  </TextField>
                </Box>
                <Box width={"48%"}>
                  <TextField
                    required
                    type="number"
                    fullWidth
                    name={input.name1}
                    label={input.label1}
                    variant="outlined"
                  />
                </Box>
              </Box>
            ))}
            <Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                mt={5}
              >
                <Box width={"48%"}>
                  <Button
                    // type="submit"
                    variant="contained"
                    onClick={handleChange}
                    sx={{
                      // width: "%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Add Distributor
                  </Button>
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
                    Create
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
