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

function SaleForm() {
  const { auth } = useAppSelector((state) => state.auth);
  const [stock, setStock] = useState<Stock[]>([]);
  const [updateDispatch, setUpdateDispatch] = useState({
    pharmaAddress: auth.address,
    batchId: "",
    qtySold: 0,
  });
  const [availQty, setAvailQty] = useState(0);

  const getStock = async () => {
    try {
      const res = (
        await axios.get("/api/getStock", {
          params: { pharmaAddress: auth.address },
        })
      ).data;
      //   console.log(res)
      setStock(res);
      //   console.log('From Dispatch: ', dispatches)
    } catch (error) {
      console.log(error, "Response Error");
    }
  };

  const handleQuantity = () => {
    if (stock) {
      const selectedBatch = stock.filter(
        (dispatch) => dispatch.batchId === updateDispatch.batchId
      );
      for (const pharma of selectedBatch[0].pharmacy) {
        if (pharma.pharmaAddress === auth.address) {
          setAvailQty(pharma.deliveredAmount - updateDispatch.qtySold);
        }
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post("/api/pharmacy/updateDispatch", {
      updateDispatch,
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
  };

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
