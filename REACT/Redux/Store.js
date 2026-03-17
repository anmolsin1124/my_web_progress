import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice2";

const stores = configureStore({
    reducer: {
        slice2: cartReducer
    }
});
export default stores;