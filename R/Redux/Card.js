import { useState } from "react";
import FoodCart from "./FoodCart";
const foodItem = [
    { id: 1, food: 'Pizza', Price: "200" },
    { id: 2, food: 'Burger', Price: "100" },
    { id: 3, food: 'Pasta', Price: "150" },
    { id: 4, food: 'Fries', Price: "50" },
    { id: 5, food: 'Coke', Price: "30" },
    // crete 25 items in the same format
    { id: 6, food: 'Sandwich', Price: "120" },
    { id: 7, food: 'Salad', Price: "80" },
    { id: 8, food: 'Soup', Price: "90" },
    { id: 9, food: 'Ice Cream', Price: "60" },
    { id: 10, food: 'Cake', Price: "150" },
    { id: 11, food: 'Donut', Price: "40" },
    { id: 12, food: 'Muffin', Price: "70" },
    { id: 13, food: 'Croissant', Price: "80" },
    { id: 14, food: 'Bagel', Price: "50" },
    { id: 15, food: 'Pancakes', Price: "100" },
    { id: 16, food: 'Waffles', Price: "120" },
    { id: 17, food: 'Omelette', Price: "90" },
    { id: 18, food: 'French Toast', Price: "110" },
    { id: 19, food: 'Smoothie', Price: "80" },
    { id: 20, food: 'Juice', Price: "40" },
    { id: 21, food: 'Coffee', Price: "30" },
    { id: 22, food: 'Tea', Price: "20" },
    { id: 23, food: 'Milkshake', Price: "70" },
    { id: 24, food: 'Hot Chocolate', Price: "60" },
    { id: 25, food: 'Energy Drink', Price: "90" }
];


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
            {foodItem.map((value) => {
                return (
                    <div key={value.id}>
                        <FoodCart value={value}></FoodCart>
                    </div>
                )
            })}
        </>
    )

}