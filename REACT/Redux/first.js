import React from "react";
import ReactDOM from "react-dom/client";
import { ReactReduxContext } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
function App() {
    return (
        <>
            <Provider store={store}>
                <Counting />
            </Provider>
        </>
    )

    const root = ReactDOM.createRoot(document.getElementById("root")).render(<App />)