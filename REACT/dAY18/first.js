import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client"
import Add from "./Add";
function App() {
    const [language, setlanguage] = useState("JavaScript", "Python,'Java");
    function handleclick() {
        setlanguage('C++', ...language);
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "50px " }}>
                {
                    language.map((value, index) => <Add key={index} value={value}></Add>)
                }
            </div>
            <button onClick={handlelick}>Add language</button>
        </>
    )
}
ReactDOM.createRoot(document.getElementById('root')).render(<App></App>)