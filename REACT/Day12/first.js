import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./src/Home";
import About from "./src/DashBoard";
import Contact from "./src/Contract";
import DashBoard from "./src/DashBoard";


function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/Home" style={{ backgroundColor: "green", color: 'white', fontSize: '40px', border: '1px solid white' }}> Home</Link>
                <Link to="/Contact" style={{ backgroundColor: "Yellow", color: 'black', fontSize: '40px' }}
                > Contact</Link>
                <Link to="/DashBoard" style={{ backgroundColor: "green", color: 'white', fontSize: '40px' }}> DashBoard</Link>
            </nav>
            <Routes>
                <Route path="/Home" element={<Home></Home>}></Route>
                <Route path="/Contact" element={<Contact></Contact>}></Route>
                <Route path="/DashBoard" element={<DashBoard></DashBoard>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App></App>)