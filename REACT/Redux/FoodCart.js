import { useState } from 'react';

export default function FoodCart({ value }) {
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
            <button onClick={handleCart}>{isCart ? 'Remove' : 'Add'}</button>
        </>
    )
}