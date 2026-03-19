import { useState } from "react";
export default function Add() {
    const [count, setcount] = useState(0);
    return (<>
        <h1> Count Is :{count}</h1>
        <button onClick={() => setcount(setcount + 1)}> Vote</button>

    </>
    )
}