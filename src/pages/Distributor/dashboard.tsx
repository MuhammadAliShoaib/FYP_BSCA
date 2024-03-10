import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Container, Grid } from "@mui/material";

import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationTable from "../../components/NotificationTable";
import { useAppSelector } from "../../config/redux/hooks";
import { socket } from "../../socket";

let start = true;

export default function Dashboard() {
    useEffect(() => {
        if (start) {
            console.log("hello");
            socket.emit(
                "newUser",
                "0xdb95bB2236a7621151ff47C9723101f6DeCFeeC4"
            );
            start = false;
        }
    }, []);

    return (
        <>
            <Header title="Dashboard" />
            <Box sx={(theme) => ({
                padding: "25px", bgcolor:
                    theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.4)'
                        : 'rgba(0, 0, 0, 0.4)',
            })}>
                <Container>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid
                                item
                                xs={12}
                                md={3}
                                key={item}
                                className="flexCenter"
                            >
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
                        ))}
                    </Grid>
                </Container>
                <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            style={{ paddingTop: "5px", paddingBottom: "10px" }}
                        >
                            <NotificationTable />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
