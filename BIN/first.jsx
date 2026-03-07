// import { useState } from "react";
import React,  {useState} from "react";
import ReactDOM from "react-dom/client";




function Counter() {
    const [count, setCount] = useState(0);
    const[dec,Setcount] = useState(0);
     function increment () {
        setCount(count + 1);
    }
    function decrement() {
        // document.querySelector("h1").innerText = `Count is:${--count}`;
        setCount(count - 1);

    
    }
    return (<div className="first">
        <h1> Count is:{count}</h1>
        <button onClick={increment}>Increment: {count}</button>
        <button onClick={decrement}>Decrement :{count}</button>
    </div>
    )
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Counter />);
