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
import { ACCESS_CONTROL_CONTRACT_ADDRESS } from "../../../utility/utilts.tsx";
import AccessControl from "../../../contract/AccessControl.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export default function PharmaOrder() {
  const { auth } = useAppSelector((state) => state.auth);
  const [dispatches, setDipatches] = useState<Dispatches[]>([]);
  const [pharmacies, setPharmacies] = useState<User[]>([]);
  const [couriers, setCouriers] = useState<User[]>([]);
  const [updateDispatch, setUpdateDispatch] = useState({
    batchId: "",
    courier: "",
    distributor: {
      status: "Dispatched to Pharmacy",
      distributorName: auth.name,
      distributorAddress: auth.address,
      distributorSupply: 0,
    },
    pharmaAddress: "",
    pharmaName: "",
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

  const getCouriers = async () => {
    try {
      const res = (await axios.get("/api/getCouriers")).data;
      setCouriers(res);
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
        setAvailQty(
          distro.distributorSupply -
            distro.distributedAmount -
            updateDispatch.quantity
        );
      }
    }
  };

  const handleClick = async () => {
    if (updateDispatch.pharmaAddress.length == 0) {
      return;
    }
    updateDispatch.pharmaName =
      pharmacies.find(
        (pharma) => pharma.address === updateDispatch.pharmaAddress
      )?.name || "Pharma";
    try {
      const batchId = updateDispatch.batchId;
      const pharma = pharmacies.find(
        (pharmacy) => pharmacy.address === updateDispatch.pharmaAddress
      );
      const res = (
        await axios.post("/api/notification", {
          senderAddress: auth.address,
          receiverAddress: updateDispatch.courier,
          notification: {
            batchId,
            deliverTo: { name: pharma?.name, address: pharma?.address },
            dispatchDetails: updateDispatch,
          },
          date: new Date(),
        })
      ).data;
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const {
    data: result,
    writeAsync,
    isSuccess,
  } = useContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: "updateDispatch",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateDispatch.pharmaName =
      pharmacies.find(
        (pharma) => pharma.address === updateDispatch.pharmaAddress
      )?.name || "Pharma";

    try {
      writeAsync &&
        (await writeAsync({
          args: [
            updateDispatch.batchId,
            updateDispatch.pharmaAddress,
            updateDispatch.quantity,
            updateDispatch.courier,
            "Courier",
          ],
        }));
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        try {
          let txnHash = result;
          console.log("TxnHash: ", txnHash?.hash);
          const response = await axios.post("/api/distributor/updateDispatch", {
            updateDispatch,
            txnHash: txnHash?.hash,
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
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    getDispatches();
    getPharma();
    getCouriers();
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
              <Box mt={3} display="flex">
                <TextField
                  required
                  fullWidth
                  select
                  name="courier"
                  label="Courier"
                  defaultValue={""}
                  onChange={(event) =>
                    setUpdateDispatch((prevState) => ({
                      ...prevState,
                      courier: event.target.value,
                    }))
                  }
                  variant="outlined"
                >
                  <MenuItem defaultValue={""} />
                  {couriers.map((courier) => (
                    <MenuItem key={courier.address} value={courier.address}>
                      <option label={courier.name} />
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  onClick={handleClick}
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
