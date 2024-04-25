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
  const { auth } = useAppSelector((state) => state.auth);
  const [meds, setMeds] = useState<Medicine[]>([]);
  const [flag, setFlag] = useState(false);

  const getMedicines = async () => {
    try {
      const response = (
        await axios.get(`/api/manufacturer/medicines`, {
          params: { manufacturer: auth.address },
        })
      ).data;
      setMeds(response);
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
      dosage: null,
      activeIngredient: "",
      manufacturer: auth.address,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name should be at least 3 characters")
        .required("Name is required"),
      dosage: Yup.number()
        .positive("Should be a Positive Number")
        .test("is-in-range", "Dosage must greater than 0", (value) => {
          if (value === undefined) {
            return false;
          }
          return value >= 1;
        })
        .required("Dosage is required"),
      activeIngredient: Yup.string()
        .min(3, "Ingredient should be at least 3 characters")
        .required("Formula is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/manufacturer/addProduct", {
          name: values.name,
          dosage: values.dosage,
          activeIngredient: values.activeIngredient,
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
        }
        console.error("Error:", error);
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
        sx={{ flexGrow: 1, padding: "25px" }}
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
          <Typography
            variant="h4"
            style={{ paddingLeft: "15px", paddingTop: "20px" }}
          >
            Add Product
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ padding: "20px" }}>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Box sx={{ flex: "1", mr: "5px" }}>
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
                {formik.errors.name && formik.touched.name ? (
                  <Box
                    component={"span"}
                    sx={{ display: "inline", color: "red" }}
                  >
                    {formik.errors.name}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ flex: "1", ml: "5px" }}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="dosage"
                  name="dosage"
                  label="Mg Dosage"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.dosage}
                />
                {formik.errors.dosage && formik.touched.dosage ? (
                  <Box
                    component={"span"}
                    sx={{ display: "inline", color: "red" }}
                  >
                    {formik.errors.dosage}
                  </Box>
                ) : null}
              </Box>
            </Box>
            <Box mt={3}>
              <TextField
                required
                fullWidth
                id="activeIngredient"
                name="activeIngredient"
                label="Active Ingredient"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.activeIngredient}
              />
              {formik.errors.activeIngredient &&
              formik.touched.activeIngredient ? (
                <Box
                  component={"span"}
                  sx={{ display: "inline", color: "red" }}
                >
                  {formik.errors.activeIngredient}
                </Box>
              ) : null}
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
          <Typography
            variant="h4"
            style={{ paddingLeft: "15px", paddingTop: "20px" }}
          >
            List of Products
          </Typography>
          <List>
            {meds.map((medicine) => (
              <ListItem
                key={medicine.name}
                style={{ borderBottom: "1px solid black" }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <LocalHospital />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={medicine.completeName}
                  secondary={`Dosage: ${medicine.dosage} Mg`}
                />
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    </>
  );
}
