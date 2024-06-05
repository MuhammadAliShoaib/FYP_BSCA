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

export const BatchProgress = ({ batchId }: { batchId?: any }) => {
  const ctx = useContext(ThemeContext);
  const [batch, setBatch] = useState();
  const [index, setIndex] = useState(0)

  const getBatchProgress = async () => {
    if (batchId !== null) {
      try {
        const response = await axios.get("/api/getBatchProgress", {
          params: { batchId },
        });
        console.log("<============Batch Progress========>")
        console.log(response.data)
        setBatch(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };


  useEffect(() => {
    getBatchProgress();
  }, []);


  const dispatches = {
    manufacturer: (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {/* <Button variant="contained" fullWidth target="_blank" href={`https://sepolia.etherscan.io/tx/${batch?.transactions[0]}`}>
                View Transaction
              </Button> */}
          <DropDown options={batch?.transactions} />
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
              value={`https://sepolia.etherscan.io/tx/${batch?.transactions[0]}`}
            /> */}
        </TimelineContent>
      </TimelineItem>
    ),
    distributor: (
      batch?.distributor?.map((distributor, index) => {
        return (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <DropDown options={distributor?.distroTransactions} />
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
        )
      }
      )
    ),
    pharmacy: (
      batch?.distributor[index].pharmacy?.map((pharmacy, index) => {
        return (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <DropDown options={pharmacy?.pharmaTransactions} />
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
        )
      }
      )
    ),
  }

  return (
    <>
      <Timeline
        position="alternate"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >

        {
          batch ?
            <div>
              {batch?.transactions.length != 0 && dispatches['manufacturer']}
              {batch?.distributor.length != 0 && dispatches['distributor']}
              {batch?.distributor.length != 0 && batch?.distributor[index].pharmacy[index].pharmaTransactions.length != 0 && dispatches['pharmacy']}
            </div>
            : null
        }
        {/* {batch?.distributor.length != 0 ? (
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
        ) : null} */}

        {/* {batch?.distributor[0].pharmacy.pharmaTransactions && (
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
        )} */}
        {/* {sample.customerTransaction && (
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
        )} */}
      </Timeline>
    </>
  );
};
