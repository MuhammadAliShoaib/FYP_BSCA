import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { Medicine } from "../../../types/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../config/redux/hooks";

export default function BatchForm() {
  const { auth } = useAppSelector((state) => state.auth);
  const [meds, setMeds] = useState<Medicine[]>([]);
  const [mfgDate, setMfgDate] = useState("");
  const [expDate, setExpDate] = useState("");

  const getMedicines = async () => {
    try {
      const result = (
        await axios.get(`/api/manufacturer/meds`, {
          params: { manufacturer: auth.address },
        })
      ).data;
      setMeds(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedicines();
  }, []);

  const formik = useFormik({
    initialValues: {
      medicine: "",
      quantity: 0,
      manufacturer: auth.address,
    },
    validationSchema: Yup.object({
      medicine: Yup.string().required("Name is required"),
      quantity: Yup.number().required("Enter a Quantity"),
    }),
    onSubmit: async (values) => {
      const unix = +new Date();
      const symbol = meds.find((med) => med.name === values.medicine)?.symbol;
      const batchId = [symbol?.toUpperCase(), unix].join("-");

      try {
        const response = await axios.post("/api/createbatch", {
          batchId: batchId,
          medicine: values.medicine,
          quantity: values.quantity,
          mfg: mfgDate,
          exp: expDate,
          manufacturer: values.manufacturer,
        });

        if (!response) {
          throw new Error("Something Went Wrong!");
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
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <>
      <Header title="Batch" />
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
              Create Batch
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ padding: "20px" }}>
              <Box mt={3} display="flex" justifyContent="space-between">
                <TextField
                  required
                  fullWidth
                  select
                  name="medicine"
                  label="Select Medicine"
                  defaultValue={""}
                  onChange={formik.handleChange}
                  value={formik.values.medicine}
                  variant="outlined"
                >
                  {Array.isArray(meds) &&
                    meds.map((med) => (
                      <MenuItem value={med.name} key={med.name}>
                        <option label={med.name} />
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                />
              </Box>
              <Box mt={3} display="flex" justifyContent="space-between">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Manufacturing date"
                    format="DD/MM/YYYY"
                    onChange={(date) =>
                      setMfgDate(date?.toLocaleString() as string)
                    }
                    value={mfgDate}
                    disablePast
                    sx={{ width: "48%" }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Expiry"
                    format="DD/MM/YYYY"
                    onChange={(date) =>
                      setExpDate(date?.toLocaleString() as string)
                    }
                    value={expDate}
                    disablePast
                    sx={{ width: "48%" }}
                  />
                </LocalizationProvider>
              </Box>
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    width: "25%",
                  }}
                >
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}
