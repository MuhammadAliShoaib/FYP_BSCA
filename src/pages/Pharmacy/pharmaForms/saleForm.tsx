import { FormEvent, useEffect, useState } from "react";
import Header from "../../../components/Header.tsx";
import {
  Container,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { User, Dispatches, Stock } from "../../../types/types.ts";
import { useAppSelector } from "../../../config/redux/hooks.tsx";
import { toast } from "react-toastify";
import { ACCESS_CONTROL_CONTRACT_ADDRESS } from "../../../utility/utilts.tsx";
import AccessControl from "../../../contract/AccessControl.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

function SaleForm() {
  const { auth } = useAppSelector((state) => state.auth);
  const [stock, setStock] = useState<Stock[]>([]);
  const [distro, setDistributor] = useState("");
  const [updateDispatch, setUpdateDispatch] = useState({
    pharmaAddress: auth.address,
    batchId: "",
    qtySold: 0,
  });
  const [availQty, setAvailQty] = useState(0);

  const getStock = async () => {
    try {
      const res = (
        await axios.get("/api/pharmacy/getStock", {
          params: { pharmaAddress: auth.address },
        })
      ).data;
      setStock(res);
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const handleQuantity = () => {
    if (stock) {
      const selectedBatch = stock.find(
        (dispatch) => dispatch.batchId === updateDispatch.batchId
      );

      console.log("Selected Batch: ", JSON.stringify(selectedBatch));
      if (selectedBatch != null) {
        const distributor = selectedBatch.distributor;
        setDistributor(distributor.distributorAddress);
        console.log("Distro: ", distro);
        const pharma = distributor.pharmacy;
        if (pharma.pharmaAddress === auth.address) {
          setAvailQty(pharma.deliveredAmount - updateDispatch.qtySold);
        }
      }
    }
  };

  const {
    data: result,
    writeAsync,
    isSuccess,
  } = useContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: "pharmacyCreateOrder",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      writeAsync &&
        (await writeAsync({
          args: [updateDispatch.batchId, distro, updateDispatch.qtySold],
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
          const response = await axios.post("/api/pharmacy/updateDispatch", {
            updateDispatch,
            distro,
            txnHash: txnHash?.hash,
          });
          if (!response) {
            throw new Error("Dispatch Failed");
          }
          toast.success(`Medicine Sold`, {
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
    getStock();
    if (updateDispatch.batchId !== "") {
      handleQuantity();
    }
  }, [updateDispatch]);

  return (
    <>
      <Header title="Pharmacy Order" />
      <Box
        mt={10}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
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
          <Box width={"100%"}>
            <Typography variant="h4" style={{ paddingLeft: "15px" }}>
              Create Order
            </Typography>

            <form onSubmit={(event) => handleSubmit(event)}>
              <Box
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                mt={5}
              >
                <Box width={"85%"}>
                  <TextField
                    required
                    fullWidth
                    select
                    name="medicines"
                    label="Select BatchID"
                    value={updateDispatch.batchId || ""}
                    onChange={(event) => {
                      setUpdateDispatch((prev) => ({
                        ...prev,
                        batchId: event.target.value,
                      }));
                    }}
                    variant="outlined"
                  >
                    {stock.map((stock) => (
                      <MenuItem
                        value={stock.batchDetails.batchId}
                        key={stock.batchDetails.batchId}
                      >
                        <option label={stock.batchDetails.medicine} />
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box width={"85%"} mt={"15px"}>
                  <Typography
                    paddingLeft={"10px"}
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
                        qtySold: Number(event.target.value),
                      }));
                    }}
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
                  <Box
                    width={"97%"}
                    display={"flex"}
                    alignItems={"end"}
                    justifyContent={"right"}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      // onClick={handleClick}
                      sx={{
                        width: "15%",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      Dispatch
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default SaleForm;
