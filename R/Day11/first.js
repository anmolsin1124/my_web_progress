import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import Increment from "./Increment";
import Decrement from "./Decrement";
function App({ counts }) {
    const [count, setcount] = useState(0);
    return (
        <>
            <h1> Counter Is :{count}</h1>
            <Increment counts={count} setcounts={setcount} />
            <Decrement counts={counts} setcount={setcount} />
        </>
    )
}
ReactDOM.createRoot(document.getElementById('root')).render(<App></App>)