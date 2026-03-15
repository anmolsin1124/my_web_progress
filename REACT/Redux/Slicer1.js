import { createSlice } from "@reduxjs/toolkit
";
import { useState } from "react";
const reactslider = createSlice({
    name: "reactReducer",
    initialState: { count: 0 },
    reducers: {
        increment: (state) => { state.count = state.count + 1 },
        Decrement: (state) => { state.count = state.count - 1 },
        Reset: (state) => { state.count = 0 }
    }
})
// const { count, setCount } = useState(0)
reactslider.actions.increment;
reactslider.actions.Decrement;
reactslider.actions.Reset;
export default reactslider.reducer;