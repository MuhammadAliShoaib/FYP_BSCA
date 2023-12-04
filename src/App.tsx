import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
// import Manufacturer from "./pages/manufacturer";
// import Distributor from "./pages/distributor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/manufacturer" element={<Dashboard />} />
      <Route path="/distributor" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
