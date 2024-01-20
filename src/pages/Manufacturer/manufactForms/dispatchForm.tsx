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
import { Batch, User } from "../../../types/types.ts";
import { socket } from "../../../socket.ts";

export default function DispatchForm() {
  const { address } = useAccount();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [distributors, setDistributors] = useState<User[]>([]);

  // const [inputs, setInputs] = useState([
  //   {
  //     type: "number",
  //     fullWidth: "fullwidth",
  //     name: "distributor",
  //     name1: "quantity",
  //     label: "Distributor",
  //     label1: "Quantity",
  //     variant: "outlined",
  //   },
  // ]);

  // const handleChange = () => {
  //   setInputs((prevState) => [
  //     ...prevState,
  //     {
  //       type: "number",
  //       fullWidth: "fullwidth",
  //       name: "distributor",
  //       name1: "quantity",
  //       label: "Distributor",
  //       label1: "Quantity",
  //       variant: "outlined",
  //     },
  //   ]);
  // };

  const getBatches = async () => {
    try {
      const res = (await axios.get("/api/getbatch", { params: { address } }))
        .data;
      setBatches(res);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const getDistros = async () => {
    try {
      const res = (await axios.get("/api/getdistro")).data;
      setDistributors(res);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const handleClick = () => {
    socket.emit("sendNotification", {
      senderName: "Muhammad Ali",
      receiverAddress: "0xdb95bB2236a7621151ff47C9723101f6DeCFeeC4"
    });
  }

  useEffect(() => {
    getBatches();
    getDistros();
  }, []);

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
                  {batches.map((batch) => (
                    <MenuItem value={batch.medicine} key={batch.batchId}>
                      <option label={batch.medicine} />
                    </MenuItem>
                  ))}
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
                  {batches.map((batch) => (
                    <MenuItem value={batch.batchId} key={batch.batchId}>
                      <option label={batch.batchId} />
                    </MenuItem>
                  ))}
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
                  select
                  name="distributor"
                  label="Distributor"
                  variant="outlined"
                >
                  {distributors.map((distro) => (
                    <MenuItem value={distro.address}>
                      <option label={distro.name} />
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box width={"48%"}>
                <TextField
                  required
                  type="number"
                  fullWidth
                  name="dispatchQuantity"
                  label="Quantity"
                  variant="outlined"
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
                {/* <Box width={"48%"}>
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
                </Box> */}
                <Box
                  width={"97%"}
                  display={"flex"}
                  alignItems={"end"}
                  justifyContent={"right"}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleClick}
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
