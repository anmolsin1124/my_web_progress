import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from './Slice2';

export default function FoodCart({ value }) {
    const [isCart, setIncart] = useState(false);
    const dispatch = useDispatch();
    function handleCart() {
        if (isCart) {
            dispatch(removeItem(value));
            setIncart(false);
        }
        else {
            dispatch(addItem(value));
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