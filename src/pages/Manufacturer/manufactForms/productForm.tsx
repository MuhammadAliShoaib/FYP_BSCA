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
} from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Medicine } from "../../../types/types";
import { useAppSelector } from "../../../config/redux/hooks";

export default function ProductForm() {
    const {auth} = useAppSelector((state)=>state.auth)
    const [meds, setMeds] = useState<Medicine[]>([]);
    const [flag, setFlag] = useState(false);

    const getMedicines = async () => {
        try {
            const result = (
                await axios.get(`/api/manufacturer/meds`,{ params: { manufacturer: auth.address }})
            ).data;
            setMeds(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMedicines();
        setFlag(false);
    }, [flag]);

    const formik = useFormik({
        initialValues: {
            name: "",
            symbol: "",
            formula: "",
            manufacturer: auth.address,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            symbol: Yup.string().required("Symbol is required"),
            formula: Yup.string().required("Formula is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/api/addproduct", {
                    name: values.name,
                    symbol: values.symbol,
                    formula: values.formula,
                    manufacturer: values.manufacturer,
                });

                if (!response) {
                    throw new Error("Something Went Wrong!");
                }
                const data = await response.data;
                toast.success("Product added successfully!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setFlag(true);
                console.log(data);
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
    });

    return (
        <>
            <Header title="Products" />
            <Box
                mt={10}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                minHeight={"90vh"}
                sx={{ flexGrow: 1 }}
            >
                <Container
                    style={{
                        minWidth: "45%",
                        minHeight: "22vh",
                        display: "flex",
                        backgroundColor: "white",
                        borderTop: "2px solid black",
                        borderBottomLeftRadius: "5px",
                        borderBottomRightRadius: "5px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        paddingBottom: "15px",
                    }}
                >
                    <Box width={"100%"}>
                        <Box width={"100%"} ml={2}>
                            <h1 style={{ paddingLeft: "15px" }}>Add Product</h1>
                        </Box>
                        <form onSubmit={formik.handleSubmit}>
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
                                        id="name"
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </Box>
                                <Box width={"48%"}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="symbol"
                                        name="symbol"
                                        label="Symbol"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.symbol}
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
                                    <Box width={"48%"}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="formula"
                                            name="formula"
                                            label="Formula"
                                            variant="outlined"
                                            onChange={formik.handleChange}
                                            value={formik.values.formula}
                                        />
                                    </Box>
                                    <Box
                                        width={"48%"}
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"right"}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                width: "15%",
                                                paddingTop: "10px",
                                                paddingBottom: "10px",
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Container>

                <Container
                    style={{
                        minWidth: "50%",
                        minHeight: "22vh",
                        display: "flex",
                        flexDirection: "column",
                        // backgroundColor: "white",
                        // borderTop: "2px solid black",
                        borderBottomLeftRadius: "5px",
                        borderBottomRightRadius: "5px",

                        paddingBottom: "15px",
                        marginTop: "50px",
                    }}
                >
                    <Box width={"95%"}>
                        <h1
                            style={{
                                paddingLeft: "15px",
                                textDecorationLine: "underline",
                                textUnderlinePosition: "under",
                            }}
                        >
                            List of Products
                        </h1>
                    </Box>
                    <Box width={"100%"}>
                        <List dense>
                            {meds.map((medicine) => (
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    margin={"10px"}
                                    padding={"0"}
                                    alignItems={"center"}
                                    borderBottom={"1px solid black"}
                                    bgcolor={"white"}
                                    borderRadius={"3px"}
                                    // boxShadow={
                                    //     "rgba(0, 0, 0, 0.24) 0px 1px 3px"
                                    // }
                                >
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocalHospital />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={medicine.name}
                                            secondary={medicine.symbol}
                                        />
                                    </ListItem>
                                </Box>
                            ))}
                        </List>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
