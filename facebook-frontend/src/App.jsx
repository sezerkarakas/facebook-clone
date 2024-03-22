import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import People from "./components/People/People";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <Sidebar />
        <Outlet />
        <People />
      </div>
    </>
  );
}

export default App;
