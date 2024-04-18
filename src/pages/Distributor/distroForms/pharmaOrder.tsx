import { FormEvent, useEffect, useState } from "react";
import Header from "../../../components/Header.tsx";
import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { User, Dispatches } from "../../../types/types.ts";
import { useAppSelector } from "../../../config/redux/hooks.tsx";
import { toast } from "react-toastify";

export default function PharmaOrder() {
  const { auth } = useAppSelector((state) => state.auth);
  const [dispatches, setDipatches] = useState<Dispatches[]>([]);
  const [pharmacies, setPharmacies] = useState<User[]>([]);
  const [updateDispatch, setUpdateDispatch] = useState({
    distroAddress: auth.address,
    batchId: "",
    pharmaAddress: "",
    quantity: 0,
  });
  const [availQty, setAvailQty] = useState(0);

  const getDispatches = async () => {
    try {
      const res = (
        await axios.get("/api/distributor/getDispatches", {
          params: { distributorAddress: auth.address },
        })
      ).data;
      setDipatches(res);
      console.log("From Dispatch: ", dispatches);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const getPharma = async () => {
    try {
      const pharma = (await axios.get("/api/distributor/getPharma")).data;
      setPharmacies(pharma);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const handleQuantity = () => {
    const selectedBatch = dispatches.filter(
      (dispatch) => dispatch.batchId === updateDispatch.batchId
    );
    for (const distro of selectedBatch[0].distributor) {
      if (distro.distributorAddress === auth.address) {
        setAvailQty(distro.distributedAmount - updateDispatch.quantity);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post("/api/distributor/updateDispatch", {
      updateDispatch,
    });
    if (!response) {
      throw new Error("Dispatch Failed");
    }
    toast.success(`Helo`, {
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
    getDispatches();
    getPharma();
    if (updateDispatch.batchId !== "") {
      handleQuantity();
    }
  }, [updateDispatch]);

  return (
    <>
      <Header title="Pharmacy Order" />
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
              Create Order
            </Typography>
            <form
              onSubmit={(event) => handleSubmit(event)}
              style={{ padding: "20px" }}
            >
              <Box mt={3} display="flex" justifyContent="space-between">
                <TextField
                  required
                  fullWidth
                  select
                  name="medicines"
                  label="Select Medicine Batch"
                  value={updateDispatch.batchId || ""}
                  onChange={(event) => {
                    setUpdateDispatch((prev) => ({
                      ...prev,
                      batchId: event.target.value,
                    }));
                  }}
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                >
                  {dispatches.map((dispatch) => (
                    <MenuItem key={dispatch.batchId} value={dispatch.batchId}>
                      <option label={dispatch.batchId} />
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  select
                  name="batch"
                  label="Select Pharmacy"
                  variant="outlined"
                  value={updateDispatch.pharmaAddress || ""}
                  onChange={(event) => {
                    setUpdateDispatch((prev) => ({
                      ...prev,
                      pharmaAddress: event.target.value,
                    }));
                  }}
                >
                  {pharmacies.map((pharma) => (
                    <MenuItem key={pharma.address} value={pharma.address}>
                      <option label={pharma.name} />
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box mt={3}>
                <Typography
                  variant="body1"
                  style={{ marginLeft: "15px", marginTop: "20px" }}
                >{`Available Amount: ${availQty}`}</Typography>
                <TextField
                  required
                  type="number"
                  fullWidth
                  name="dispatchQuantity"
                  label="Quantity"
                  variant="outlined"
                  sx={{ height: 55 }}
                  onChange={(event) => {
                    setUpdateDispatch((prev) => ({
                      ...prev,
                      quantity: Number(event.target.value),
                    }));
                  }}
                />
              </Box>
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
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
