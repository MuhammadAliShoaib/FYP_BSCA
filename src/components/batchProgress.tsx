import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Button,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeContext } from "../config/Context/themeProvider";
import { FC, useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { timelineConfig, timelineNumber } from "../utility/utilts";
import { FactoryRounded } from "@mui/icons-material";
// import DropDown from "./DropDown";
// import axios from "axios";

interface BatchProgressProps {
  batch: any;
  index: number;
  setIndex: (index: number) => void;
}

export const BatchProgress: FC<BatchProgressProps> = ({
  batch,
  index,
  setIndex,
}) => {
  const ctx = useContext(ThemeContext);
  const [manufacturerTXN, setManufacturerTXN] = useState("");
  const [distroName, setDistroName] = useState("");
  const [pharmaName, setPharmaName] = useState("");
  const [filteredDistro, setFilteredDistro] = useState([]);
  const [filteredPharma, setFilteredPharma] = useState([]);
  const [distroTXN, setDistroTXN] = useState("");
  const [pharmaTXN, setPharmaTXN] = useState("");

  const filterDistro = (distroName: string) => {
    setFilteredDistro(
      batch?.distributor?.find(
        (distro: any) => distro.distributorName === distroName
      )
    );
  };
  const filterPharma = (pharmaName: string) => {
    setFilteredPharma(
      filteredDistro?.pharmacy?.find(
        (pharma: any) => pharma.pharmaName === pharmaName
      )
    );
  };

  useEffect(() => {
    if (distroName === "") {
      setDistroTXN("");
      setPharmaTXN("");
      setPharmaName("");
      setFilteredDistro([]);
      setFilteredPharma([]);
    }
    if (pharmaName === "") setPharmaTXN("");
  }, [distroName]);

  const dispatches = {
    manufacturer: (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0", width: "500px" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          <InputLabel
            id="transaction-select-label"
            sx={{ display: "flex", justifyContent: "start" }}
          >
            Select Transaction
          </InputLabel>
          <TextField
            required
            fullWidth
            select
            name="manufacturerTxn"
            onChange={(event) => {
              setManufacturerTXN(event.target.value);
            }}
            defaultValue={""}
            variant="outlined"
          >
            <MenuItem
              key={1}
              value={""}
              sx={{ background: { paper: "white" } }}
            >
              <option label={"<None>"} />
            </MenuItem>
            {batch?.transactions.map((txn: string) => (
              <MenuItem
                key={txn}
                value={txn}
                sx={{ background: { paper: "white" } }}
              >
                <option label={"TXN:" + txn} />
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: "5px" }}
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${manufacturerTXN}`}
            disabled={manufacturerTXN === ""}
          >
            View Transaction
          </Button>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FactoryRounded fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography
            variant="h6"
            component="span"
            color={ctx.mode === "light" ? "black" : "white"}
          >
            Manufacturer
          </Typography>
          <br />
          {manufacturerTXN !== "" ? (
            <div
              style={{
                padding: "5px",
                backgroundColor: "white",
                display: "inline-block",
              }}
            >
              <QRCode
                size={150}
                value={`https://sepolia.etherscan.io/tx/${manufacturerTXN}`}
              />
            </div>
          ) : null}
        </TimelineContent>
      </TimelineItem>
    ),
    distributor: (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0", width: "500px" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {/* <DropDown options={distributor?.distroTransactions} /> */}
          <InputLabel
            id="transaction-select-label"
            sx={{ display: "flex", justifyContent: "start" }}
          >
            Select Distributor
          </InputLabel>
          <TextField
            required
            fullWidth
            select
            name="distributor"
            // label="Select Transaction"
            onChange={(event) => {
              setDistroName(event.target.value);
              filterDistro(event.target.value);
            }}
            defaultValue={""}
            variant="outlined"
          >
            <MenuItem
              key={305}
              value={""}
              sx={{ background: { paper: "white" } }}
            >
              <option label={"<None>"} />
            </MenuItem>
            {batch?.distributor?.map((distro: string, index: number) => (
              <MenuItem
                key={index}
                value={distro.distributorName}
                sx={{ background: { paper: "white" } }}
              >
                <option label={"Distributor:" + distro.distributorName} />
              </MenuItem>
            ))}
            {/* ${manufacturerTXN} */}
          </TextField>
          {distroName !== "" ? (
            <>
              <InputLabel
                id="transaction-select-label"
                sx={{ display: "flex", justifyContent: "start" }}
              >
                Select Transactions
              </InputLabel>
              <TextField
                required
                fullWidth
                select
                name="distroTXN"
                // label="Select Transaction"
                onChange={(event) => {
                  setDistroTXN(event.target.value);
                }}
                defaultValue={""}
                variant="outlined"
              >
                <MenuItem
                  key={305}
                  value={""}
                  sx={{ background: { paper: "white" } }}
                >
                  <option label={"<None>"} />
                </MenuItem>
                {filteredDistro?.distroTransactions?.map(
                  (txn: string, index: number) => (
                    <MenuItem
                      key={index}
                      value={txn}
                      sx={{ background: { paper: "white" } }}
                    >
                      <option label={"TXN:" + txn} />
                    </MenuItem>
                  )
                )}
                {/* ${manufacturerTXN} */}
              </TextField>
            </>
          ) : null}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: "5px" }}
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${distroTXN}`}
            disabled={distroName === "" || distroTXN === ""}
          >
            View Transaction
          </Button>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FactoryRounded fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography
            variant="h6"
            component="span"
            color={ctx.mode === "light" ? "black" : "white"}
          >
            Distributor
          </Typography>
          <br />
          {distroTXN !== "" ? (
            <div
              style={{
                padding: "5px",
                backgroundColor: "white",
                display: "inline-block",
              }}
            >
              <QRCode
                size={150}
                value={`https://sepolia.etherscan.io/tx/${distroTXN}`}
              />
            </div>
          ) : null}
        </TimelineContent>
      </TimelineItem>
    ),
    pharmacy: (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0", width: "500px" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {/* <DropDown options={pharmacy?.pharmaTransactions} /> */}
          <InputLabel
            id="transaction-select-label"
            sx={{ display: "flex", justifyContent: "start" }}
          >
            Select Pharmacy
          </InputLabel>
          <TextField
            required
            fullWidth
            select
            name="pharmacy"
            // label="Select Transaction"
            onChange={(event) => {
              setPharmaName(event.target.value);
              filterPharma(event.target.value);
            }}
            defaultValue={""}
            variant="outlined"
            InputProps={{
              sx: {
                textAlign: "left",
              },
            }}
          >
            <MenuItem
              key={302}
              value={""}
              sx={{ background: { paper: "white" } }}
            >
              <option label={"<None>"} />
            </MenuItem>
            {filteredDistro?.pharmacy?.map((pharma: any) => (
              <MenuItem
                key={pharma.pharmaAddress}
                value={pharma.pharmaName}
                sx={{ background: { paper: "white" } }}
              >
                <option label={"Pharmacy:" + pharma.pharmaName} />
              </MenuItem>
            ))}
          </TextField>
          {distroName !== "" && pharmaName !== "" ? (
            <>
              <InputLabel
                id="transaction-select-label"
                sx={{ display: "flex", justifyContent: "start" }}
              >
                Select Transactions
              </InputLabel>
              <TextField
                required
                fullWidth
                select
                name="distroTXN"
                // label="Select Transaction"
                onChange={(event) => {
                  setPharmaTXN(event.target.value);
                }}
                defaultValue={""}
                variant="outlined"
              >
                <MenuItem
                  key={305}
                  value={""}
                  sx={{ background: { paper: "white" } }}
                >
                  <option label={"<None>"} />
                </MenuItem>
                {filteredPharma
                  ? filteredPharma?.pharmaTransactions?.map(
                      (txn: string, index: number) => (
                        <MenuItem
                          key={index}
                          value={txn}
                          sx={{ background: { paper: "white" } }}
                        >
                          <option label={"TXN:" + txn} />
                        </MenuItem>
                      )
                    )
                  : null}
                {/* ${manufacturerTXN} */}
              </TextField>
            </>
          ) : null}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: "5px" }}
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${pharmaTXN}`}
            disabled={pharmaName === "" || pharmaTXN === ""}
          >
            View Transaction
          </Button>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FactoryRounded fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography
            variant="h6"
            component="span"
            color={ctx.mode === "light" ? "black" : "white"}
          >
            Pharmacy
          </Typography>
          <br />
          {pharmaTXN !== "" ? (
            <div
              style={{
                padding: "5px",
                backgroundColor: "white",
                display: "inline-block",
              }}
            >
              <QRCode
                size={150}
                value={`https://sepolia.etherscan.io/tx/${pharmaTXN}`}
              />
            </div>
          ) : null}
        </TimelineContent>
      </TimelineItem>
    ),
  };

  return (
    <>
      <Timeline
        position="alternate"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {batch ? (
          <div>
            {batch?.transactions.length != 0 && dispatches["manufacturer"]}
            {batch?.distributor.length != 0 && dispatches["distributor"]}
            {batch?.distributor.length != 0 &&
              batch?.distributor[index].pharmacy[index]?.pharmaTransactions
                .length != 0 &&
              dispatches["pharmacy"]}
          </div>
        ) : null}
      </Timeline>
    </>
  );
};

{
  /* {batch?.distributor.length != 0 ? (
  <TimelineItem>
    <TimelineOppositeContent
      sx={{ m: "auto 0" }}
      align="right"
      variant="body2"
      color="text.secondary"
    >
        <DropDown options={sample.distributor.distroTransactions} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineConnector />
      <TimelineDot>
        <FactoryRounded fontSize="large" />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent sx={{ py: "12px", px: 2 }}>
      <Typography
        variant="h6"
        component="span"
        color={ctx.mode === "light" ? "black" : "white"}
      >
        Distributor
      </Typography>
      <br />
    </TimelineContent>
  </TimelineItem>
) : null} */
}

{
  /* {batch?.distributor[0].pharmacy.pharmaTransactions && (
  <TimelineItem>
    <TimelineOppositeContent
      sx={{ m: "auto 0" }}
      align="right"
      variant="body2"
      color="text.secondary"
    >
      <DropDown options={sample.pharmacy.pharmaTransactions} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineConnector />
      <TimelineDot>
        <FactoryRounded fontSize="large" />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent sx={{ py: "12px", px: 2 }}>
      <Typography
        variant="h6"
        component="span"
        color={ctx.mode === "light" ? "black" : "white"}
      >
        Pharmacy
      </Typography>
      <br />
    </TimelineContent>
  </TimelineItem>
)} */
}
{
  /* {sample.customerTransaction && (
  <TimelineItem>
    <TimelineOppositeContent
      sx={{ m: "auto 0" }}
      align="right"
      variant="body2"
      color="text.secondary"
    >
      <Button variant="contained" fullWidth target="_blank" href="">
        View Transaction
      </Button>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineConnector />
      <TimelineDot>
        <FactoryRounded fontSize="large" />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent sx={{ py: "12px", px: 2 }}>
      <Typography
        variant="h6"
        component="span"
        color={ctx.mode === "light" ? "black" : "white"}
      >
        Sold To Customer
      </Typography>
      <br />
    </TimelineContent>
  </TimelineItem>
)} */
}

// const sample = {
//   manuTransaction: "Manufacturer Transaction",
//   customerTransaction: "Customer Transaction",
//   distributor: {
//     distroTransactions: ["Distro1", "Distro2", "Distro3", "Distro4"],
//   },
//   pharmacy: {
//     pharmaTransactions: ["pharma1", "pharma2", "pharma3", "pharma4"],
//   },
// };
