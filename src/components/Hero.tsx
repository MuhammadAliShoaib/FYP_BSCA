import { useState, useRef } from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { BatchProgress } from "./batchProgress";
import axios from "axios";
import { toast } from "react-toastify";

export default function Hero() {
  const inputRef = useRef("");
  const [batchId, setBatchId] = useState("");
  const [batch, setBatch] = useState();
  const [index, setIndex] = useState(0);

  const getBatchProgress = async () => {
    if (batchId !== null) {
      try {
        const response = await axios.get("/api/getBatchProgress", {
          params: { batchId },
        });
        console.log("<============Batch Progress========>");
        console.log(JSON.stringify(response.data, null, 4));
        setBatch(response.data);
      } catch (error: any) {
        console.log("Error: ", error);
        if (error.response && error.response.status === 404) {
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
      }
    }
  };

  // useEffect(() => {
  //   getBatchProgress();
  // }, []);

  const handleClick = () => {
    // const searchValue = inputRef.current.value;
    // setBatchId(searchValue);
    // console.log(batchId);
    getBatchProgress();
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : "linear-gradient(#02294F, #090E10)",
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center", // Aligns items horizontally in the center
              alignItems: "center", // Aligns items vertically in the center
              textAlign: "center",
            }}
          >
            The Future of&nbsp;
          </Typography>

          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center", // Aligns items horizontally in the center
              alignItems: "center", // Aligns items vertically in the center
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
                fontWeight: "bold", // Highlighting style for "Pharma"
              }}
            >
              Pharma
            </Typography>
            &nbsp;And&nbsp;
            <Typography
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
                fontWeight: "bold", // Highlighting style for "Traceability"
              }}
            >
              Traceability
            </Typography>
          </Typography>

          <Typography variant="body1" textAlign="center" color="text.secondary">
            Revolutionizing the Pharma Industry&apos;s Supply Chain Management
            with Blockchain <br />
            Technology to ensure Transparency, Accountability, Efficiency <br />{" "}
            in the Track and Traceability of Medicines.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic"
              inputRef={inputRef}
              hiddenLabel
              size="medium"
              variant="outlined"
              aria-label="Input Batch Id"
              // placeholder="Input Batch Id"
              onChange={(event) => setBatchId(event.target.value)}
              inputProps={{
                autocomplete: "off",
                ariaLabel: "Input Batch Id",
              }}
              sx={{
                "& .MuiInputBase-input": {
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "white" : "black",
                },
              }}
            />
            <Button variant="contained" color="primary" onClick={handleClick}>
              Search
            </Button>
          </Stack>
        </Stack>
        <Box
          id="image"
          padding={"15px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"visible"}
          pt={"15px"}
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            minHeight: { xs: 200, sm: 700 },
            height: "auto",
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        >
          <BatchProgress batch={batch} index={index} setIndex={setIndex} />
        </Box>
      </Container>
    </Box>
  );
}
