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

// import * as React from 'react';
// import PropTypes from 'prop-types';

// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
// import AppAppBar from '../components/AppAppBar';
// import Hero from '../components/Hero';
// import LogoCollection from '../components/LogoCollection';
// import Highlights from '../components/Highlights';
// import Pricing from '../components/Pricing';
// import Features from '../components/Features';
// import Testimonials from '../components/Testimonials';
// import FAQ from '../components/FAQ';
// import Footer from '../components/Footer';
// import getLPTheme from '../theme/getLPTheme';

// const defaultTheme = createTheme({});

// function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }:any) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '100dvw',
//         position: 'fixed',
//         bottom: 24,
//       }}
//     >
//       <ToggleButtonGroup
//         color="primary"
//         exclusive
//         value={showCustomTheme}
//         onChange={toggleCustomTheme}
//         aria-label="Platform"
//         sx={{
//           backgroundColor: 'background.default',
//           '& .Mui-selected': {
//             pointerEvents: 'none',
//           },
//         }}
//       >
//         <ToggleButton value>
//           <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
//           Custom theme
//         </ToggleButton>
//         <ToggleButton value={false}>Material Design 2</ToggleButton>
//       </ToggleButtonGroup>
//     </Box>
//   );
// }

// ToggleCustomTheme.propTypes = {
//   showCustomTheme: PropTypes.shape({
//     valueOf: PropTypes.func.isRequired,
//   }).isRequired,
//   toggleCustomTheme: PropTypes.func.isRequired,
// };

// export default function LandingPage() {
//   const [mode, setMode] = React.useState('dark');
//   const [showCustomTheme, setShowCustomTheme] = React.useState(true);
//   const LPtheme = createTheme(getLPTheme(mode));

//   const toggleColorMode = () => {
//     setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   const toggleCustomTheme = () => {
//     setShowCustomTheme((prev) => !prev);
//   };

//   return (
//     <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
//       <CssBaseline />
//       <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
//       <Hero />
//       <Box sx={{ bgcolor: 'background.default' }}>
//         {/* <LogoCollection /> */}
//         <Features />
//         <Divider />
//         <Testimonials />
//         <Divider />
//         <Highlights />
//         <Divider />
//         <Pricing />
//         <Divider />
//         <FAQ />
//         <Divider />
//         <Footer />
//       </Box>
//       <ToggleCustomTheme
//         showCustomTheme={showCustomTheme}
//         toggleCustomTheme={toggleCustomTheme}
//       />
//     </ThemeProvider>
//   );
// }
