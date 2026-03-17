import { useState } from "react"
import { useDispatch } from "react-redux";

export default function CustomCounter() {
    const [number, setnumber] = useState("");
    const dispatch = useDispatch();
    function handleclick() {
        dispatch(CustomIncreaser(Number(number)));
        setnumber = null;
    }
    return (
        <>
            <input type="number" value={number} onChange={(e) => setnumber(e.target.value)}></input>
            <button>Sumbit </button>
        </>
    )
}