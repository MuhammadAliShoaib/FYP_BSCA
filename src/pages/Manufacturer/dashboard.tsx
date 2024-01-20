import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, Container, Grid } from '@mui/material'

import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationTable from '../../components/NotificationTable';
import { useAppSelector } from '../../config/redux/hooks';
import { socket } from '../../socket';


let start = true;

export default function Dashboard() {

    // const { auth } = useAppSelector(
    //     (state) => state.auth
    // );

    useEffect(() => {
        if (start) {
            console.log("hello")
            socket.emit("newUser", "0xdb95bB2236a7621151ff47C9723101f6DeCFeeC4")
            start = false;
        }
    }, [])

    // const [notify, setNotify] = useState([
    //     {
    //         date: "04/10/2023",
    //         notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
    //     },
    //     {
    //         date: "04/10/2023",
    //         notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
    //     },
    //     {
    //         date: "04/10/2023",
    //         notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
    //     },
    //     {
    //         date: "04/10/2023",
    //         notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
    //     },
    //     {
    //         date: "04/10/2023",
    //         notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
    //     }, {
    //         date: "04/10/2023",
    //         notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
    //     }
    // ])
    return (
        <>

            <Header title="Dashboard" />
            {/* <DrawerHeader /> */}
            <Box sx={{ padding: "25px" }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="">
                        <h1>Dashboard</h1>
                        </div>
                        <div className="" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className=""><WbSunnyIcon /></div>
                            <div className="" style={{ marginRight: '10px' }}>{time}</div>
                            <div className="">{day + month}</div>
                        </div>
                    </Box> */}
                <Container>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item xs={12} md={3} key={item} className="flexCenter">
                                <div className="messagesDiv">
                                    <p
                                        style={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 600,
                                            fontSize: 50,
                                            margin: 0,
                                        }}
                                    >
                                        4
                                    </p>
                                    <div>New messages</div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>


                {/* <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Grid container>
                        <Grid item xs={12} style={{ backgroundColor: 'white', boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px", paddingTop: '5px', paddingBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '25px' }}>
                                <QueryStatsIcon style={{ marginRight: '10px' }} />
                                <p>Your latest activity across all projects</p>
                            </div>


                            <Grid container style={{ backgroundColor: '#E1ECF7', paddingLeft: '15px' }}>
                                <Grid item xs={6} md={2}>
                                    <p style={{ paddingLeft: '10px' }}>Date</p>
                                </Grid>
                                <Grid item xs={6} md={10}>
                                    <p>Activities</p>
                                </Grid>
                            </Grid>


                            <Grid container style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                {notify.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={6} md={2} style={{ borderBottom: '1px solid #ccc' }}>
                                            <p style={{ paddingLeft: '10px' }}>{data.date}</p>
                                        </Grid>
                                        <Grid item xs={6} md={10} style={{ borderBottom: '1px solid #ccc' }}>
                                            <p>{data.notification}</p>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container> */}

                <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Grid container>
                        <Grid item xs={12} style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                            <NotificationTable />
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </>
    )
}
