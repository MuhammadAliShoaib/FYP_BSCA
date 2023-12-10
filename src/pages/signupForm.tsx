import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAccount } from "wagmi";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";

export default function SignUpForm() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(
    "url(https://source.unsplash.com/random?wallpapers)"
  );

  const imageUrls = [
    "url(https://source.unsplash.com/random?wallpapers)",
    "url(https://source.unsplash.com/random?landscape)",
    "url(https://source.unsplash.com/random?nature)",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex =
        (imageUrls.indexOf(backgroundImage) + 1) % imageUrls.length;
      setBackgroundImage(imageUrls[nextIndex]);
    }, 7000);

    return () => clearInterval(intervalId);
  }, [backgroundImage, imageUrls]);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: address,
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is required"),
      role: Yup.string().required("Please select a role"),
    }),
    onSubmit: async (values: any) => {
      try {
        console.log("hello");
        const response = await Axios.post("/api/signup/user", {
          name: values.name,
          address: values.address,
          role: values.role,
        });

        if (!response) {
          throw new Error("Something Went Wrong!");
        }
        const data = await response.data;
        console.log(data);
        navigate(`/${values.role}`);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        sx={{ backgroundColor: "#E1ECF7" }}
        square
      >
        <Box
          sx={{
            height: "90vh",
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              select
              required
              fullWidth
              id="role"
              label="Role"
              name="role"
              defaultValue={""}
              onChange={formik.handleChange}
              value={formik.values.role}
              autoComplete="role"
              autoFocus
            >
              <MenuItem value="manufacturer">
                <option label="Manufacturer" />
              </MenuItem>
              <MenuItem value="distributor">
                <option label="Distributor" />
              </MenuItem>
              <MenuItem value="pharmacy">
                <option label="Pharmacy" />
              </MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
