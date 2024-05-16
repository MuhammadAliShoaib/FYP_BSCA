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
import { Batch, User, Dispatch, Product } from "../../../types/types.ts";
import { useAppSelector } from "../../../config/redux/hooks.tsx";
import { toast } from "react-toastify";
import { ACCESS_CONTROL_CONTRACT_ADDRESS } from "../../../utility/utilts.tsx";
import AccessControl from "../../../contract/AccessControl.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
// import {useWriteContract} from 'wagmi';

export default function DispatchForm() {
  const { auth } = useAppSelector((state) => state.auth);
  const [meds, setMeds] = useState<Product[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [medicine, setMedicine] = useState("");
  const [distributors, setDistributors] = useState<User[]>([]);
  const [couriers, setCouriers] = useState<User[]>([]);
  const [dispatch, setDispatch] = useState<Dispatch>({
    batchId: "",
    courier: "",
    distributor: {
      status: "Dispatched to Distributor",
      distributorName: "",
      distributorAddress: "",
      distributorSupply: 0,
    },
  });

  const getMeds = async () => {
    try {
      const res = (
        await axios.get(`/api/manufacturer/medicineBatches`, {
          params: { manufacturer: auth.address },
        })
      ).data;

      setMeds(res);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const filterBatches = async () => {
    if (medicine !== "") {
      const [selectedMedicine] = meds.filter(
        (med) => med.completeName === medicine
      );
      setBatches(selectedMedicine.medicineBatches);
    }
  };

  const getDistros = async () => {
    try {
      const res = (await axios.get("/api/manufacturer/getDistro")).data;
      setDistributors(res);
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

  const { config } = usePrepareContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: "dispatchBatch",
    args: [
      dispatch.batchId,
      medicine,
      dispatch.distributor.distributorSupply,
      dispatch.distributor.distributorAddress,
      dispatch.distributor.distributorName,
      dispatch.courier,
      "Courier",
    ],
  });

  const { data, writeAsync, isSuccess } = useContractWrite(config);

  const handleClick = async () => {
    if (dispatch.distributor.distributorAddress.length == 0) {
      return;
    }
    dispatch.distributor.distributorName =
      distributors.find(
        (distro) => distro.address === dispatch.distributor.distributorAddress
      )?.name || "Distro";
    try {
      const batchId = dispatch.batchId;
      const distributor = distributors.find(
        (distro) => distro.address === dispatch.distributor.distributorAddress
      );
      const res = (
        await axios.post("/api/notification", {
          senderAddress: auth.address,
          receiverAddress: dispatch.courier,
          notification: {
            batchId,
            deliverTo: {
              name: distributor?.name,
              address: distributor?.address,
            },
            dispatchDetails: dispatch,
          },
          date: new Date(),
        })
      ).data;
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const handleDispatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch.distributor.distributorName =
      distributors.find(
        (distro) => distro.address === dispatch.distributor.distributorAddress
      )?.name || "Distro";
    try {
      writeAsync && (await writeAsync());
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getMeds();
    filterBatches();
    getDistros();
    getCouriers();
  }, [medicine]);

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const txnHash = data;
        console.log("Txn Hash: ", txnHash?.hash);
        try {
          const response = await axios.post("/api/manufacturer/dispatch", {
            dispatch,
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
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            toast.error(`${error.response.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (error.response && error.response.status === 404) {
            toast.error(`${error.response.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          console.log("Error: ", error);
        }
      }
    })();
  }, [isSuccess]);

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
            marginTop: "25px",
            minWidth: "55%",
            minHeight: "25vh",
            display: "flex",
            alignItems: "center",
            paddingTop: "35px",
            paddingBottom: "45px",
            backgroundColor: "white",
            border: "2px solid #0959AA",
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
                <Box width={"50%"}>
                  <TextField
                    required
                    fullWidth
                    select
                    name="medicines"
                    label="Select Medicine"
                    onChange={(event) => {
                      setMedicine(event.target.value);
                      setDispatch((prevState) => ({
                        ...prevState,
                        batchId: "",
                      }));
                    }}
                    defaultValue={""}
                    variant="outlined"
                  >
                    {meds.map((med) => (
                      <MenuItem
                        key={med.dosage}
                        value={med.completeName}
                        sx={{ background: { paper: "white" } }}
                      >
                        <option label={med.completeName} />
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
                    value={dispatch.batchId || ""}
                    sx={{ mt: "15px" }}
                    onChange={(event) =>
                      setDispatch((prevState) => ({
                        ...prevState,
                        batchId: event.target.value,
                      }))
                    }
                    variant="outlined"
                  >
                    <MenuItem value={""} />
                    {medicine !== "" &&
                      batches.map((batch) => (
                        <MenuItem key={batch.batchId} value={batch.batchId}>
                          <option label={batch.batchId} />
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
                <Box
                  ml={"15px"}
                  width={"50%"}
                  border={"2px solid #0959AA"}
                  borderRadius={"5px"}
                >
                  {dispatch.batchId === "" ? null : (
                    <Box px={"10px"}>
                      <Typography variant="h6" borderBottom={"1px solid black"}>
                        Medicine:{" "}
                        {
                          batches.find(
                            (batch) => batch.batchId === dispatch.batchId
                          )?.medicine
                        }
                      </Typography>
                      <Typography variant="h6">
                        Manufactured:{" "}
                        {dispatch.batchId &&
                        batches.find(
                          (batch) => batch.batchId === dispatch.batchId
                        )?.mfg
                          ? new Date(
                              batches.find(
                                (batch) => batch.batchId === dispatch.batchId
                              )?.mfg || ""
                            ).toLocaleDateString("en-GB")
                          : "N/A"}
                      </Typography>
                      <Typography variant="h6">
                        Pack Size:{" "}
                        {
                          batches.find(
                            (batch) => batch.batchId === dispatch.batchId
                          )?.packSize
                        }{" "}
                        {
                          batches.find(
                            (batch) => batch.batchId === dispatch.batchId
                          )?.unit
                        }
                      </Typography>
                      <Typography variant="h6">
                        Carton Size:{" "}
                        {
                          batches.find(
                            (batch) => batch.batchId === dispatch.batchId
                          )?.cartonSize
                        }
                      </Typography>
                      <Typography variant="h6">
                        Initial Supply:{" "}
                        {
                          batches.find(
                            (batch) => batch.batchId === dispatch.batchId
                          )?.totalSupply
                        }
                      </Typography>
                      <Typography variant="h6">
                        Available Supply:{" "}
                        {
                          batches.find(
                            (batch) => batch.batchId === dispatch.batchId
                          )?.quantity
                        }
                      </Typography>
                    </Box>
                  )}
                </Box>
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
                        status: prevState.distributor.status,
                        distributorName: prevState.distributor.distributorName,
                        distributorAddress: event.target.value,
                        distributorSupply:
                          prevState.distributor.distributorSupply,
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
                        status: prevState.distributor.status,
                        distributorName: prevState.distributor.distributorName,
                        distributorAddress:
                          prevState.distributor.distributorAddress,
                        distributorSupply: Number(event.target.value),
                      },
                    }));
                  }}
                  variant="outlined"
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
                    setDispatch((prevState) => ({
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
