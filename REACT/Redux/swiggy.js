import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Header from "./Header";
import Card from "./Card";
import { Provider } from "react-redux";
import stores from "./Store";

function App() {
    return (
        <Provider stores={stores}>
            <Header></Header>
            <Card></Card>
        </Provider>


    )
}
const root = ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);

