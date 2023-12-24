import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { User } from "../types/types";
import { WalletButton } from "@rainbow-me/rainbowkit";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { userlogin } from "../config/redux/features/Auth/authReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [flag, setFlag] = useState(false);

  const { auth, isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const handler = (connect: () => void): void => {
    connect();
    setFlag(true);
  };

  const loginHandler = async () => {
    try {
      dispatch(userlogin(address));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (isLoading) {
    //   return;
    // }

    if (isSuccess) {
      navigate(`/${auth.role}`);
    } else if (isError) {
      console.error("Login failed");
    }
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    if (isConnected && flag) {
      setFlag(false);
      navigate("/signup");
    }
    if (isConnected && !flag) {
      loginHandler();
    }
  }, [isConnected]);

  return (
    <AppBar
      position="static"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Blockchain Supply Chain
        </Typography>
        <WalletButton.Custom wallet="metamask">
          {({ ready, connect }) => {
            return (
              <Button
                href=""
                disabled={!ready}
                style={{ backgroundColor: "white", color: "black" }}
                onClick={connect}
                variant="contained"
                sx={{ my: 1, mx: 1.5 }}
              >
                Connect Metamask
              </Button>
            );
          }}
        </WalletButton.Custom>
        <WalletButton.Custom wallet="metamask">
          {({ ready, connect }) => {
            return (
              <Button
                href=""
                disabled={!ready}
                style={{ backgroundColor: "white", color: "black" }}
                onClick={() => {
                  handler(connect);
                }}
                variant="contained"
                sx={{ my: 1, mx: 1.5 }}
              >
                Signup
              </Button>
            );
          }}
        </WalletButton.Custom>
        {isConnected && (
          <Button
            style={{ backgroundColor: "white", color: "black" }}
            onClick={() => disconnect()}
            href=""
            variant="contained"
            sx={{ my: 1, mx: 1.5 }}
          >
            Disconnect
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
