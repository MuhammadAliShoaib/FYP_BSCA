import "./App.css";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from "./config/appRouter";

function App() {
  return (
    <>
    <AppRouter/>
    <ToastContainer/>
    </>
  );
}

export default App;
