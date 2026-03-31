import { useState } from "react";
export default function Decrement(counts, setcounts) {
    return (<>
        <button onClick={() => setcounts(counts - 1)}>Decement</button>
    </>)
}