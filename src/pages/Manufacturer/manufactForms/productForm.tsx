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
    Typography,
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
    const { auth } = useAppSelector((state) => state.auth)
    const [meds, setMeds] = useState<Medicine[]>([]);
    const [flag, setFlag] = useState(false);

    const getMedicines = async () => {
        try {
            const result = (
                await axios.get(`/api/manufacturer/meds`, { params: { manufacturer: auth.address } })
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
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="90vh"
            sx={{ flexGrow: 1, padding: '25px' }}
        >
            <Container
                style={{
                    minWidth: "45%",
                    minHeight: "22vh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    border: "2px solid black",
                    borderRadius: "5px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    paddingBottom: "35px",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h4" style={{ paddingLeft: "15px", paddingTop: "20px" }}>Add Product</Typography>
                <form onSubmit={formik.handleSubmit} style={{ padding: "20px" }}>
                    <Box mt={3} display="flex" justifyContent="space-between">
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
                        <TextField
                            required
                            fullWidth
                            id="symbol"
                            name="symbol"
                            label="Symbol"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.symbol}
                            style={{ marginLeft: "10px" }}
                        />
                    </Box>
                    <Box mt={3}>
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
                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ paddingTop: "10px", paddingBottom: "10px", width: "25%" }}
                        >
                            Add
                        </Button>
                    </Box>
                </form>
            </Container>

            <Container
                style={{
                    minWidth: "50%",
                    minHeight: "22vh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    border: "2px solid black",
                    borderRadius: "5px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    paddingBottom: "15px",
                    width: "100%",
                    maxWidth: "800px",
                }}
            >
                <Typography variant="h4" style={{ paddingLeft: "15px", paddingTop: "20px" }}>List of Products</Typography>
                <List>
                    {meds.map((medicine) => (
                        <ListItem key={medicine.manufacturer} style={{ borderBottom: "1px solid black" }}>
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
                    ))}
                </List>
            </Container>
        </Box>
    </>
    );
}
