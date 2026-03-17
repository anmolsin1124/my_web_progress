import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Header from "./Header";
import Card from "./Card";
function App() {
    return (
        <>  <Header></Header>
            <Card></Card>
        </>


    )
}
const root = ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);

