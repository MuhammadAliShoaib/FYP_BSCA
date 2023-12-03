import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import "./App.css";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboard";

function App() {
  const { address, isConnected } = useAccount();
  return (
    <>
      {/* <ConnectButton />
      {isConnected ? <p>{address}</p> : null} */}
      {/* <LandingPage/> */}
      <Dashboard/>
    </>
  );
}

export default App;
