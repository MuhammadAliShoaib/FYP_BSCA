import { AppBar, Toolbar, Typography } from "@mui/material";
import Button from '@mui/material/Button';
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
    <>
      <WalletButton.Custom wallet="metamask">
        {({ ready, connect }) => {
          return (
            <Button
              disabled={!ready}
              color="primary"
              variant="text"
              size="small"
              href=""
              onClick={connect}
            >
              Connect to MetaMask
            </Button>

          );
        }}
      </WalletButton.Custom>
      <WalletButton.Custom wallet="metamask">
        {({ ready, connect }) => {
          return (
            <Button
              color="primary"
              variant="contained"
              size="small"
              href=""
              disabled={!ready}
              onClick={() => {
                handler(connect);
              }}
            >
              Sign up
            </Button>

          );
        }}
      </WalletButton.Custom>
      {isConnected && (
        <Button
          color="primary"
          variant="text"
          size="small"
          onClick={() => disconnect()}
          href=""
        >
          Disconnect
        </Button>

      )}
    </>
  );
}
