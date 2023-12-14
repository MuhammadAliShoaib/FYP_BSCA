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

export default function BatchForm() {
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
                  name="distributor"
                  label="Distributor"
                  variant="outlined"
                >
                  <MenuItem value="distro">
                    <option label="Distro" />
                  </MenuItem>
                </TextField>
              </Box>
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
                  name="quantity"
                  label="Quantity"
                  variant="outlined"
                />
              </Box>
              <Box
                width={"48%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Manufacturing date"
                    format="DD/MM/YYYY"
                    disablePast
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Expiry" format="DD/MM/YYYY" disablePast />
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
