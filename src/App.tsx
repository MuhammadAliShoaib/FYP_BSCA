import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboard";
import SignUpForm from "./pages/signupForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/manufacturer" element={<Dashboard />} />
      <Route path="/distributor" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
