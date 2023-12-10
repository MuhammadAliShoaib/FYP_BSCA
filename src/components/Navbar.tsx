import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { User } from "../types/types";
import { WalletButton } from "@rainbow-me/rainbowkit";
import Axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';

export default function Navbar() {

    const navigate = useNavigate();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const handler = (connect: () => void): void => {
        connect();
        navigate("/signup");
    };

    const loginHandler = async () => {
        try {
            const res: User = (
                await Axios.get(`/api/login`, { params: { address: address } })
            ).data;
            // console.log("Response... ", res);

            if (!res) {
                disconnect();
                throw new Error(`HTTP error! Status: ${500}`);
            } else {
                navigate(`/${res.role}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isConnected) {
            loginHandler();
        }
    }, [isConnected]);


    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Blockchain Supply Chain
                </Typography>
                <WalletButton.Custom wallet="metamask">
                    {({ ready, connect }) => {
                        return (
                            <Button href="#" disabled={!ready} onClick={connect} variant="contained" sx={{ my: 1, mx: 1.5 }}>
                                Connect Metamask
                            </Button>
                        );
                    }}
                </WalletButton.Custom>
                <WalletButton.Custom wallet="metamask">
                    {({ ready, connect }) => {
                        return (
                            <Button href="#" disabled={!ready} onClick={() => {
                                handler(connect);
                            }} variant="contained" sx={{ my: 1, mx: 1.5 }}>
                                Signup
                            </Button>
                        );
                    }}
                </WalletButton.Custom>
                {isConnected && <Button onClick={() => disconnect()} href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                    Disconnect
                </Button>}
            </Toolbar>
        </AppBar>
    )
}
