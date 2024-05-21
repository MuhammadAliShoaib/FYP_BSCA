import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Button, Typography } from "@mui/material";
import { ThemeContext } from "../config/Context/themeProvider";
import { useContext, useEffect, useState } from "react";
import { timelineConfig, timelineNumber } from "../utility/utilts";
import { FactoryRounded } from "@mui/icons-material";
import DropDown from "./DropDown";
import axios from "axios";

const sample = {
  manuTransaction: "Manufacturer Transaction",
  customerTransaction: "Customer Transaction",
  distributor: {
    distroTransactions: ["Distro1", "Distro2", "Distro3", "Distro4"],
  },
  pharmacy: {
    pharmaTransactions: ["pharma1", "pharma2", "pharma3", "pharma4"],
  },
};

const getComponent = (batches: any) => {
  const ctx = useContext(ThemeContext);
  const comp = [];

  for (let i = 0; i <= 3; i++) {
    const {
      typography,
      icon: { Comp, props },
    } = timelineConfig[i];

    comp.push(
      <TimelineItem key={typography}>
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
          <TimelineDot color={props?.color || "inherit"}>
            <Comp fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography
            variant="h6"
            component="span"
            color={ctx.mode === "light" ? "black" : "white"}
          >
            {typography}
          </Typography>
          <br />
          {/* <QRCode
              size={50}
              value={`https://sepolia.etherscan.io/tx/${batches.transactions[i]}`}
            /> */}
        </TimelineContent>
      </TimelineItem>
    );
  }

  return comp;
};

export const BatchProgress = ({ batchId }: { batchId?: any }) => {
  const ctx = useContext(ThemeContext);
  const [batch, setBatch] = useState();

  const getBatchProgress = async () => {
    if (batchId !== null) {
      try {
        const response = await axios.get("/api/getBatchProgress", {
          params: { batchId },
        });

        setBatch(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  useEffect(() => {
    getBatchProgress();
  }, [batchId]);

  return (
    <>
      <Timeline
        position="alternate"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
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
              Manufacturer
            </Typography>
            <br />
            {/* <QRCode
              size={50}
              value={`https://sepolia.etherscan.io/tx/${batches.transactions[i]}`}
            /> */}
          </TimelineContent>
        </TimelineItem>
        {sample.distributor.distroTransactions.length != 0 && (
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
              {/* <QRCode
              size={50}
              value={`https://sepolia.etherscan.io/tx/${batches.transactions[i]}`}
            /> */}
            </TimelineContent>
          </TimelineItem>
        )}

        {sample.pharmacy.pharmaTransactions.length != 0 && (
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
              {/* <QRCode
              size={50}
              value={`https://sepolia.etherscan.io/tx/${batches.transactions[i]}`}
            /> */}
            </TimelineContent>
          </TimelineItem>
        )}
        {sample.customerTransaction && (
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
              {/* <QRCode
              size={50}
              value={`https://sepolia.etherscan.io/tx/${batches.transactions[i]}`}
            /> */}
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>
    </>
  );
};
