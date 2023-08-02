import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
