import { useState } from 'react';

export default function Card() {
    const [isCart, setIncart] = useState(false);
    function handleCart() {
        if (isCart) {
            setIncart(false);
        }
        else {
            setIncart(true);
        }
    }
    return (
        <>
            <h1>
                {value.food}
            </h1>
            <h2>
                {value.Price}
            </h2>
            <button onClick={handleclick}>{isCart ? 'Remove' : 'Add'}</button>
        </>
    )
}