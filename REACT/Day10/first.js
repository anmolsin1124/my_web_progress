import React, { useState, usememo } from "react";
import ReactDOM from 'reactdom/client'


/////////Use Memo hook
1//////////////// Counter Button Increased
2/////////////// Input feild Fibbnoachi Number
function Fibbonaci(n) {
    if (n <= 1)
        return n;
    else
        return Fibbonaci(n - 2) + Fibbonaci(n - 1);
}
function App() {
    ///counter
    const [count, setcount] = useState(0);
    const [number, setnumber] = useState(null);

    const result = usememo(() => { Fibbonaci(number) }, [number]);
    return (
        <>
            <h1> Counter Is : {count}</h1>
            <button onClick={() => setcount(count + 1)}>Increment</button>
            <button onClick={() => setcount(count - 1)}>Decrement</button>
            <div>
                <h2>Fibbonaci Number Is {result}</h2>
                <input type="Number" value={number} onChange={(e) => setnumber(e.target.value)}></input>
            </div>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<>App</>);