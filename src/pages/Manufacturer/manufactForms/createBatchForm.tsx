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
import {
  ACCESS_CONTROL_CONTRACT_ADDRESS,
  containerTypes,
  units,
} from "../../../utility/utilts";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import AccessControl from "../../../contract/AccessControl.json";
import { SecurityUpdateWarningSharp } from "@mui/icons-material";

export default function BatchForm() {
  const { auth } = useAppSelector((state) => state.auth);
  const [meds, setMeds] = useState<Medicine[]>([]);
  const [mfgDate, setMfgDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [batchID, setBatchID] = useState("");
  const [args, setArgs] = useState({ medName: "", quantity: 0 });

  const getMedicines = async () => {
    try {
      const result = (
        await axios.get(`/api/manufacturer/medicines`, {
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

  const handleArg = (key: string, e: any) => {
    setArgs({ ...args, [key]: e });
  };

  const {
    data: result,
    writeAsync,
    isSuccess,
  } = useContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: "createBatch",
  });

  const formik = useFormik({
    initialValues: {
      medicine: "",
      containerType: "",
      unit: "",
      packSize: null,
      cartonSize: null,
      quantity: 0,
      manufacturer: auth.address,
    },
    validationSchema: Yup.object({
      medicine: Yup.string().required("Name is required"),
      containerType: Yup.string().required(
        "Container Type need to be Specified"
      ),
      unit: Yup.string().required("Unit needs to be Specified"),
      packSize: Yup.number()
        .positive("Should be a Positive Number")
        .test("is-in-range", "Quantity must greater than 0", (value) => {
          if (value === undefined) {
            return false;
          }
          return value >= 1;
        })
        .required("Pack Size is Required"),
      cartonSize: Yup.number()
        .positive("Should be a Positive Number")
        .test("is-in-range", "Quantity must greater than 0", (value) => {
          if (value === undefined) {
            return false;
          }
          return value >= 1;
        })
        .required("Carton Size is Required"),
      quantity: Yup.number()
        .positive("Should be a Positive Number")
        .test("is-in-range", "Quantity must greater than 0", (value) => {
          if (value === undefined) {
            return false;
          }
          return value >= 1;
        })
        .required("Enter a Quantity"),
    }),
    onSubmit: async (values) => {
      const unix = +new Date();
      const name = meds.find(
        (med) => med.completeName === values.medicine
      )?.name;
      const batchId = [name?.toUpperCase(), unix].join("-");
      setBatchID(batchId);
      try {
        writeAsync &&
          (await writeAsync({
            args: [batchId, args.medName, args.quantity, mfgDate, expDate],
          }));
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
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

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const response = await axios.post("/api/manufacturer/createBatch", {
          batchId: batchID,
          medicine: formik.values.medicine,
          containerType: formik.values.containerType,
          unit: formik.values.unit,
          packSize: formik.values.packSize,
          cartonSize: formik.values.cartonSize,
          quantity: formik.values.quantity,
          mfg: mfgDate,
          exp: expDate,
          manufacturer: formik.values.manufacturer,
        });

        if (!response) {
          throw new Error("Something Went Wrong!");
        }
        // const { hash } = result;
        // console.log("Hash : " + hash)
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
      }
    })();
  }, [isSuccess]);

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
            borderRadius: "10px",
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
                  onChange={(e) => {
                    handleArg("medName", e.target.value),
                      formik.handleChange(e);
                  }}
                  value={formik.values.medicine}
                  variant="outlined"
                >
                  {Array.isArray(meds) &&
                    meds.map((med) => (
                      <MenuItem value={med.completeName} key={med.completeName}>
                        <option label={med.completeName} />
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  select
                  name="containerType"
                  label="Container Type"
                  defaultValue={""}
                  onChange={formik.handleChange}
                  value={formik.values.containerType}
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                >
                  <MenuItem defaultValue={""} />
                  {containerTypes.map((item) => (
                    <MenuItem value={item} key={item}>
                      <option label={item} />
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box mt={3} display="flex" justifyContent="space-between">
                <TextField
                  required
                  type="number"
                  name="packSize"
                  label="Pack Size"
                  onChange={formik.handleChange}
                  value={formik.values.packSize}
                  variant="outlined"
                  style={{ width: "70%" }}
                />
                <TextField
                  required
                  select
                  name="unit"
                  label="Unit"
                  onChange={formik.handleChange}
                  value={formik.values.unit}
                  variant="outlined"
                  style={{ width: "30%", marginLeft: "10px" }}
                >
                  <MenuItem defaultValue={""} />
                  {units.map((unit) => (
                    <MenuItem value={unit} key={unit}>
                      <option label={unit}></option>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              {formik.errors.packSize && formik.touched.packSize ? (
                <Box
                  component={"span"}
                  sx={{ display: "inline", color: "red" }}
                >
                  {formik.errors.packSize}
                </Box>
              ) : null}
              <Box mt={3} display="flex" justifyContent="space-between">
                <Box sx={{ flex: "1", mr: "5px" }}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    name="cartonSize"
                    label="Carton Size"
                    onChange={formik.handleChange}
                    value={formik.values.cartonSize}
                    variant="outlined"
                  />
                  {formik.errors.cartonSize && formik.touched.cartonSize ? (
                    <Box
                      component={"span"}
                      sx={{ display: "inline", color: "red" }}
                    >
                      {formik.errors.cartonSize}
                    </Box>
                  ) : null}
                </Box>
                <Box sx={{ flex: "1", ml: "5px" }}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    name="quantity"
                    label="Quantity"
                    onChange={(e) => {
                      handleArg("quantity", e.target.value),
                        formik.handleChange(e);
                    }}
                    value={formik.values.quantity}
                    variant="outlined"
                  />
                  {formik.errors.quantity && formik.touched.quantity ? (
                    <Box
                      component={"span"}
                      sx={{ display: "inline", color: "red" }}
                    >
                      {formik.errors.quantity}
                    </Box>
                  ) : null}
                </Box>
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
                    sx={{ width: "50%", mr: "5px" }}
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
                    sx={{ width: "50%", ml: "5px" }}
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
                  // onClick={write}
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
