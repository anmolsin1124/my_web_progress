export default function Increment(counts, setcounts) {
    return (
        <>  <h2> Counter Is {counts}</h2>
            <button onClick={() => setcounts(counts + 1)}> Increment</button>
        </>
    )

}
