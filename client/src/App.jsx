import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage/Home";
import AppRoutes from './Routes/Routes'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  
  return (

    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>

  )
}

export default App;