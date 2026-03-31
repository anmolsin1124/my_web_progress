import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/component/Header";
import Body from "./src/component/Body";

function GitHub() {
    //header
    //body 10 Card Show Kraenge
    return (
        <>
            <Header></Header>
            <Body></Body>
        </>
    )

}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GitHub></GitHub>);