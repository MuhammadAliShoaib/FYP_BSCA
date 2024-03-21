import { FormEvent, useEffect, useState } from "react";
import Header from "../../../components/Header.tsx";
import {Container, Box, TextField, Button, MenuItem} from '@mui/material'
import axios from "axios";
import { User, Dispatches } from "../../../types/types.ts";
import { useAppSelector } from "../../../config/redux/hooks.tsx";
import { toast } from "react-toastify";

function SaleForm() {
  const { auth } = useAppSelector((state) => state.auth);
  const [dispatches, setDipatches] = useState<Dispatches[]>([]);
//   const [availQty, setAvailQty] = useState(0)

  const getStock = async () => {
      try{
          const res = (await axios.get('/api/getStock', {params: {pharmaAddress: auth.address}})).data    
          setDipatches(res);
        //   console.log('From Dispatch: ', dispatches)
      } catch (error) {
          console.log(error, "Response Error")
      }
  }

//   const handleQuantity = () => {
//       const selectedBatch = dispatches.filter((dispatch) => dispatch.batchId === updateDispatch.batchId)
//       for(const distro of selectedBatch[0].distributor) {
//           if(distro.distributorAddress === auth.address) {
//               setAvailQty(distro.distributedAmount - updateDispatch.quantity)
//           }
//       }

//   }

  
//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//       event.preventDefault()
//       const response = await axios.post('/api/updateDispatch', {updateDispatch});
//       if (!response) {
//           throw new Error("Dispatch Failed");
//       }
//       toast.success(`Helo`, {
//           position: "bottom-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//       });
//   }

//   useEffect(() => {
//       getDispatches()
//       getPharma()
//       if(updateDispatch.batchId !== '') {
//           handleQuantity()
//       }
//   }, [updateDispatch])

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
                    borderTop: "2px solid black",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
            >
                <Box width={"100%"}>
                    <Box width={"100%"} ml={2}>
                        <h1 style={{ paddingLeft: "15px" }}>
                            Create Order
                        </h1>
                    </Box>
                    <form >
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
                                    label="Select BatchID"
                                    // value={updateDispatch.batchId || ''}
                                    // onChange={(event) => {
                                    //     setUpdateDispatch((prev) => ({
                                    //         ...prev,
                                    //         batchId: event.target.value
                                    //     }))
                                    // }}
                                    variant="outlined"
                                >
                                    {dispatches.map((dispatch) => (
                                        <MenuItem
                                            value={dispatch.batchId}
                                            key={dispatch.batchId}
                                        >
                                            <option
                                                label={dispatch.batchId}
                                            />
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
                                    label="Select Pharmacy"
                                    variant="outlined"
                                    // value={updateDispatch.pharmaName || ''}
                                    // onChange={(event) => {
                                    //     setUpdateDispatch((prev) => ({
                                    //         ...prev,
                                    //         pharmaName: event.target.value
                                    //     }))
                                    // }}
                                >
                                   {/* {pharmacies.map((pharma) => (
                                    <MenuItem value={pharma.name}
                                    key={pharma.address}>
                                    <option label={pharma.name} />
                                    </MenuItem>
                                   ))} */}
                                </TextField>
                            </Box>
                        </Box>
                        {/* <p>{`Available Amount: ${availQty}`}</p> */}
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"left"}
                            mt={5}
                            ml={2}
                        >
                            <Box width={"48.5%"}>
                                <TextField
                                    required
                                    type="number"
                                    fullWidth
                                    name="dispatchQuantity"
                                    label="Quantity"
                                    variant="outlined"
                                    sx={{height: 55}}
                                    // onChange={(event) => {
                                    //     setUpdateDispatch((prev) => ({
                                    //         ...prev,
                                    //         quantity: Number(event.target.value)
                                    //     }))
                                    // }}
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

export default SaleForm