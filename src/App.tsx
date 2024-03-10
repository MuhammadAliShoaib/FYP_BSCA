import "./App.css";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from "./config/appRouter";
import React, { useEffect } from "react";
import { socket } from "./socket";
import CustomThemeProvider from "./config/Context/themeProvider";


function App() {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  }, []);


  return (
    <CustomThemeProvider>
      <AppRouter />
      <ToastContainer />
    </CustomThemeProvider>
  );
}

export default App;
