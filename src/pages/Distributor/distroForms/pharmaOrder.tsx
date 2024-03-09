import { FormEvent, useEffect, useState } from "react";
import Header from "../../../components/Header.tsx";
import { Box, Button, Container, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { Batch, User, Dispatch } from "../../../types/types.ts";
import { useAppSelector } from "../../../config/redux/hooks.tsx";
import { toast } from "react-toastify";

export default function PharmaOrder() {
    const { auth } = useAppSelector((state) => state.auth);
    const [dispatches, setDipatches] = useState<Dispatch[]>([]);
    const [pharmacies, setPharmacies] = useState<User[]>([]);
    const [updateDispatch, setUpdateDispatch] = useState({
        batchId: '',
        pharmacyAddress: '',
        quantity: 0
    });

    const getDispatches = async () => {
        try{
            const res = (await axios.get('/api/getDispatches', {params: {distributorAddress: auth.address}})).data    
            setDipatches(res);
            console.log('From Dispatch: ', dispatches)
        } catch (error) {
            console.log(error, "Response Error")
        }
    }

    const getPharma = async () => {
        try {
            const pharma = (await axios.get('/api/getPharma')).data
            setPharmacies(pharma)
        } catch (error) {
            console.log(error, "Response Error")
        }
    }

    useEffect(() => {
        getDispatches()
        getPharma()
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle Backend

        toast.success(`OOLA`, {
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
                        <form onSubmit={(event) => handleSubmit(event)}>
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
                                        label="Select Medicine Batch"
                                        defaultValue={""}
                                        onChange={(event) => {
                                            setUpdateDispatch((prev) => ({
                                                ...prev,
                                                batchId: event.target.value
                                            }))
                                        }}
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
                                        onChange={(event) => {
                                            setUpdateDispatch((prev) => ({
                                                ...prev,
                                                pharmacyAddress: event.target.value
                                            }))
                                        }}
                                    >
                                       {pharmacies.map((pharma) => (
                                        <MenuItem value={pharma.address}
                                        key={pharma.address}>
                                        <option label={pharma.name} />
                                        </MenuItem>
                                       ))}
                                    </TextField>
                                </Box>
                            </Box>
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"left"}
                                mt={5}
                                ml={2}
                            >
                                <Box width={"48%"}>
                                    <TextField
                                        required
                                        type="number"
                                        fullWidth
                                        name="dispatchQuantity"
                                        label="Quantity"
                                        variant="outlined"
                                        onChange={(event) => {
                                            setUpdateDispatch((prev) => ({
                                                ...prev,
                                                quantity: Number(event.target.value)
                                            }))
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
