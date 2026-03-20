import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./Component/Header";
import FoodOption from "./Component/FoodOption";
import DineOption from "./Component/DineOption";
import GroceryOption from "./Component/GroceryOption"


function App() {
    return (
        <>
            <Header></Header>
            <FoodOption></FoodOption>
            <GroceryOption></GroceryOption>
            <DineOption></DineOption>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App></App>)