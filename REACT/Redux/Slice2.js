import { createSlice } from "@reduxjs/toolkit";
// import cartReducer from "./Slicer2";
const FoodSlicer = createSlice({
    name: 'slice2',
    initialState: { count: 0 },
    reducers: {
        addItems: (state) => (state.count += 1),
        removeItems: (state) => (state.count -= 1),
    }
})
export default FoodSlicer.reducer;
export const { addItems, removeItems } = FoodSlicer.actions;