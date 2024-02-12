import { FormEvent, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Box, Button, Container, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useAccount } from "wagmi";
import { Batch, User, Dispatch } from "../../../types/types.ts";
import { useAppSelector } from "../../../config/redux/hooks.tsx";
import { toast } from "react-toastify";

export default function AddPharmaForm() {
    const { auth } = useAppSelector((state) => state.auth);
    const { address } = useAccount();
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

    const handleClick = async () => {};

    const handleDispatch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Header title="Pharmacy" />
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
                                Add Pharmacy
                            </h1>
                        </Box>
                        <form onSubmit={(event) => handleDispatch(event)}>
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
                                        onChange={(event) =>
                                            setMedicine(event.target.value)
                                        }
                                        defaultValue={""}
                                        variant="outlined"
                                    >
                                        {batches.map((batch) => (
                                            <MenuItem
                                                value={batch.medicine}
                                                key={batch.batchId}
                                            >
                                                <option
                                                    label={batch.medicine}
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
                                        label="Select Batch"
                                        onChange={(event) =>
                                            setDispatch((prevState) => ({
                                                ...prevState,
                                                batchId: event.target.value,
                                            }))
                                        }
                                        variant="outlined"
                                    >
                                        {medicine !== "" &&
                                            batches
                                                .filter(
                                                    (batch) =>
                                                        batch.medicine ===
                                                        medicine
                                                )
                                                .map((batch) => (
                                                    <MenuItem
                                                        value={batch.batchId}
                                                        key={batch.batchId}
                                                    >
                                                        <option
                                                            label={
                                                                batch.batchId
                                                            }
                                                        />
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
                                        onChange={(event) =>
                                            setDispatch((prevState) => ({
                                                ...prevState,
                                                distributor: {
                                                    distributorAddress:
                                                        event.target.value,
                                                    distributedAmount:
                                                        prevState.distributor
                                                            .distributedAmount,
                                                },
                                            }))
                                        }
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
                                        onChange={(event) => {
                                            setDispatch((prevState) => ({
                                                ...prevState,
                                                distributor: {
                                                    distributorAddress:
                                                        prevState.distributor
                                                            .distributorAddress,
                                                    distributedAmount: Number(
                                                        event.target.value
                                                    ),
                                                },
                                            }));
                                        }}
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
