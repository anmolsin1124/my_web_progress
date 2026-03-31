import { useSelector } from "react-redux"

export default function Header() {

    useSelector((state) => {
        const count = state.slice2.count;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <h1>Swiggy</h1>
                <h2>card</h2>
            </div>
        )
    }