import React from "react";
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux";
import stores from "./Stores";
import Counting from "./Counting";
import CustomCounter from "./CustomCounter";

function App() {

    console.log(stores);

    return (
        <Provider store={stores}>
            <Counting></Counting>
            <br></br>
            <CustomCounter></CustomCounter>
        </Provider>

    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App></App>);


