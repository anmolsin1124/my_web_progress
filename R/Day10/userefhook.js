import React, { useState, usememo, useRef } from "react";
import ReactDOM from 'reactdom/client'


// function App() {
//     const [count, setCount] = useState(0);
//     const money = useRef(0);
//     return (
//         <>
//             <h1> Counter Is : {count.current}</h1>
//             <button onClick={() => setCount(count + 1)}>Increment</button>
//             <h1> Money  Is : {money}</h1>
//             <button onClick={() => money.current = money.current + 1}>Increment</button>
//         </>

//     )
// }

function StopWatch() {
    const [time, setTime] = useState(0);
    const interval = useRef(null);
    const [isrunning, setIsrunning] = useRef(false);
    function Start() {
        if (!isrunning) {
            interval.current =
                setInterval(() => {
                    setTime(prevTime => prevTime + 1);
                }, 1000)
            setIsrunning(true);
        }
        function Reset() {
            if (isrunning) {
                clearInterval(interval.current);
                interval.current = null;
                setIsrunning(false);
            }
        }
        function Stop() {
            if (isrunning) {
                clearInterval(interval.current)
                interval.current = null;
                setTime(0);
            }
            isrunning(false);


        }
        return (
            <>
                <h1> StopWatch Is:{time}</h1>
                <button onClick={Start}>Start</button>
                <br></br>
                <br></br>
                <button onClick={Stop}> Stop</button>
                <br></br>
                <br></br>
                <button onClick={Reset}> Reset</button>
                <br></br>
                <br></br>


            </>
        )
    }
}
ReactDOM.createRoot(document.getElementById('root')).render(<>StopWatch</>);