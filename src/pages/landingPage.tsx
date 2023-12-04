import { useEffect } from "react";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { User } from "../types/types";
import Image1 from "../assets/Bus.png";
import Image2 from "../assets/Register.png";
import SearchIcon from "@mui/icons-material/Search";
import Work from "../components/Work";
import TimeLine from "../components/Timeline";

export default function LandingPage() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handler = (): void => {
    if (isConnected) navigate("/signup");
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
    <div>
      <WalletButton.Custom wallet="metamask">
        {({ ready, connect }) => {
          return (
            <button type="button" disabled={!ready} onClick={connect}>
              Connect Metamask
            </button>
          );
        }}
      </WalletButton.Custom>
      <button onClick={handler}>Signup</button>
      <button onClick={() => disconnect()}>Disconnect</button>
      {isConnected ? <p>{address}</p> : null}
      <div className="mainRows">
        <div className="">
          <span className="header1"> The Future of Pharma </span>
          <br />
          <span className="header2"> And Traceability:</span>
          <br />
          <span className="header2"> A Blockhain-Based Solution</span>
          <br />
          <span className="header3">
            Revolutionizing the Pharma Industry&apos;s Supply Chain Management
            with <br />
            Blockchain Technology to ensure Transparency, Accountability, and{" "}
            <br />
            Efficiency in the Track and Traceability of Medicines.
          </span>
          <div
            className="mainInputDiv"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
            }}
          >
            <input
              placeholder="Input Batch Id -> Manufacturer-Medicine-Lot#-DDMMYYYY"
              style={{ width: "95%", border: "none" }}
            />
            <SearchIcon color="primary" />
          </div>
        </div>
        <div className="">
          <img src={Image1} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      <div className="mainRows">
        <span className="header2" style={{ fontSize: "2.5rem" }}>
          How Does it work?
        </span>
      </div>

      <div className="mainRows">
        <div className="mainRows" style={{ width: "80%" }}>
          <div className="" style={{ padding: "15px" }}>
            <Work image={Image2} />
          </div>
          <div className="" style={{ padding: "15px" }}>
            <Work image={Image2} />
          </div>
          <div className="" style={{ padding: "15px" }}>
            <Work image={Image2} />
          </div>
        </div>
      </div>

      <div className="mainRows">
        <span className="header2" style={{ fontSize: "2.5rem" }}>
          Main Features
        </span>
      </div>

      <TimeLine />
    </div>
  );
}
