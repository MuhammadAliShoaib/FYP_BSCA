import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Image1 from "../assets/Bus.png";
import Image2 from "../assets/Register.png";
import SearchIcon from "@mui/icons-material/Search";
import Work from "../components/Work";
import TimeLine from "../components/Timeline";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div>
              <span className="header1"> The Future of Pharma </span>
              <br />
              <span className="header2"> And Traceability:</span>
              <br />
              <span className="header2"> A Blockchain-Based Solution</span>
              <br />
              <span className="header3">
                Revolutionizing the Pharma Industry&apos;s Supply Chain
                Management with <br />
                Blockchain Technology to ensure Transparency, Accountability,
                and <br />
                Efficiency in the Track and Traceability of Medicines.
              </span>
              <div className="mainInputDiv">
                <input
                  placeholder="Input Batch Id -> Manufacturer-Medicine-Lot#-DDMMYYYY"
                  style={{ width: "95%", border: "none" }}
                />
                <SearchIcon color="primary" />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={Image1}
              style={{ width: "100%", height: "100%" }}
              alt="Bus"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
            <span className="header2" style={{ fontSize: "2.5rem" }}>
              How Does it work?
            </span>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <div style={{ padding: "15px" }}>
                  <Work image={Image2} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div style={{ padding: "15px" }}>
                  <Work image={Image2} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div style={{ padding: "15px" }}>
                  <Work image={Image2} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} style={{justifyContent:'center',alignItems:'center',display:'flex',marginTop:30}}>
            <span className="header2" style={{ fontSize: "2.5rem" }}>
              Main Features
            </span>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TimeLine />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
