import { FormEvent, useEffect, useState } from "react";
import Header from "../../../components/Header";
import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Batch, User, Dispatch } from "../../../types/types.ts";
import { useAppSelector } from "../../../config/redux/hooks.tsx";
import { toast } from "react-toastify";

export default function DispatchForm() {
  const { auth } = useAppSelector((state) => state.auth);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [medicine, setMedicine] = useState("");
  const [distributors, setDistributors] = useState<User[]>([]);
  const [dispatch, setDispatch] = useState<Dispatch>({
    batchId: "",
    distributor: {
      distributorAddress: "",
      distributedAmount: 0,
    },
  });

  const getBatches = async () => {
    try {
      const res = (
        await axios.get(`/api/manufacturer/getbatch`, {
          params: { manufacturer: auth.address },
        })
      ).data;
      setBatches(res);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const getDistros = async () => {
    try {
      const res = (await axios.get("/api/manufacturer/getdistro")).data;
      setDistributors(res);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const handleClick = async () => {
    if (dispatch.distributor.distributorAddress.length == 0) {
      return;
    }
    try {
      const res = (
        await axios.post("/api/notification", {
          senderAddress: auth.address,
          receiverAddress: dispatch.distributor.distributorAddress,
          notification: `${
            dispatch.distributor.distributedAmount
          } ${medicine} of batch ${JSON.stringify(batches)} to distributor ${
            dispatch.distributor.distributorAddress
          } is dispatched`,
          date: new Date(),
        })
      ).data;
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const handleDispatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post("/api/manufacturer/dispatch", {
      dispatch,
    });
    if (!response) {
      throw new Error("Dispatch Failed");
    }
    toast.success(`${response.data.message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    getBatches();
    getDistros();
  }, []);

  return (
    <>
      <Header title="Dispatch" />
      <Box
        mt={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }}
      >
        <Container
          style={{
            minWidth: "55%",
            minHeight: "25vh",
            display: "flex",
            alignItems: "center",
            paddingTop: "35px",
            paddingBottom: "45px",
            backgroundColor: "white",
            border: "2px solid black",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Box width="100%">
            <Typography variant="h4" style={{ paddingLeft: "15px" }}>
              Dispatch Batch
            </Typography>
            <form
              onSubmit={(event) => handleDispatch(event)}
              style={{ padding: "20px" }}
            >
              <Box mt={3} display="flex" justifyContent="space-between">
                <TextField
                  required
                  fullWidth
                  select
                  name="medicines"
                  label="Select Medicine"
                  onChange={(event) => setMedicine(event.target.value)}
                  defaultValue={""}
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                >
                  {batches.map((batch) => (
                    <MenuItem
                      key={batch.batchId}
                      value={batch.medicine}
                      sx={{ background: { paper: "white" } }}
                    >
                      <option label={batch.medicine} />
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  select
                  name="batch"
                  label="Select Batch"
                  defaultValue={""}
                  onChange={(event) =>
                    setDispatch((prevState) => ({
                      ...prevState,
                      batchId: event.target.value,
                    }))
                  }
                  variant="outlined"
                >
                  <MenuItem defaultValue={""} />
                  {medicine !== "" &&
                    batches
                      .filter((batch) => batch.medicine === medicine)
                      .map((batch) => (
                        <MenuItem key={batch.batchId} value={batch.batchId}>
                          <option label={batch.batchId} />
                        </MenuItem>
                      ))}
                </TextField>
              </Box>
              <Box mt={3} display="flex" justifyContent="space-between">
                <TextField
                  required
                  fullWidth
                  select
                  name="distributor"
                  label="Distributor"
                  defaultValue={""}
                  onChange={(event) =>
                    setDispatch((prevState) => ({
                      ...prevState,
                      distributor: {
                        distributorAddress: event.target.value,
                        distributedAmount:
                          prevState.distributor.distributedAmount,
                      },
                    }))
                  }
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                >
                  <MenuItem defaultValue={""} />
                  {distributors.map((distro) => (
                    <MenuItem key={distro.address} value={distro.address}>
                      <option label={distro.name} />
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  type="number"
                  fullWidth
                  name="dispatchQuantity"
                  label="Quantity"
                  onChange={(event) => {
                    setDispatch((prevState) => ({
                      ...prevState,
                      distributor: {
                        distributorAddress:
                          prevState.distributor.distributorAddress,
                        distributedAmount: Number(event.target.value),
                      },
                    }));
                  }}
                  variant="outlined"
                />
              </Box>
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleClick}
                  sx={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    width: "25%",
                  }}
                >
                  Dispatch
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}
