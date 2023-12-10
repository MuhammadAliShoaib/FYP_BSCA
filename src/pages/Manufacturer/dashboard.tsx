import React from 'react'
import Header from '../../components/Header'
import { Box, Container, Grid } from '@mui/material'

import QueryStatsIcon from "@mui/icons-material/QueryStats";

export default function Dashboard() {
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
                    <Grid
                        container
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Grid item md={3} className="flexCenter">
                            <div className="messagesDiv">
                                <p
                                    style={{
                                        fontFamily: "Poppins",
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
                        <Grid item md={3} className="flexCenter">
                            <div className="messagesDiv">
                                <p
                                    style={{
                                        fontFamily: "Poppins",
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
                        <Grid item md={3} className="flexCenter">
                            <div className="messagesDiv">
                                <p
                                    style={{
                                        fontFamily: "Poppins",
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
                        <Grid item md={3} className="flexCenter">
                            <div className="messagesDiv">
                                <p
                                    style={{
                                        fontFamily: "Poppins",
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
                    </Grid>
                </Container>

                <Container style={{ marginTop: "20px" }}>
                    <div >
                        <Grid container>
                            <Grid
                                item
                                md={12}
                                style={{
                                    backgroundColor: "white",
                                    padding: "10px 15px 10px 15px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <QueryStatsIcon style={{ marginRight: "10px" }} />
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Veritatis repellendus molestias tempora quis omnis
                                        consequuntur facere at autem doloremque. Sequi neque
                                        libero odio adipisci expedita nostrum ducimus cum quo
                                        minima.
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Box>
        </>
    )
}
