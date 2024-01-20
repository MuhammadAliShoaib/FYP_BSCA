import "./App.css";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from "./config/appRouter";
import { useEffect } from "react";
import { socket } from "./socket";


function App() {
  useEffect(() => { // Update with your server URL

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Handle other events or emit messages as needed

  }, []);


  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
