import { useDispatch, useSelector } from "react-redux"
import { Increment, Decrement, Reset } from "./Slicer1"
export default function Counting() {
    const count = useSelector((state) => state.Slice1.count)
    const dispatch = useDispatch();

    return (
        <>
            <h1>Counting Is:{count}</h1>
            <button onClick={() => dispatch({ type: "Slice1/increment" })}>Increment</button>
            <button onClick={() => dispatch({ type: "Slice1/decrement" })}>Decrement</button>
            <button onClick={() => dispatch({ type: "Slice1/reset" })}>Reset</button>
        </>
    )
} 