import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";
const FetchData = createAsyncThunk(
    ///Action:Type OR Payload Modes
    "coin/FetchData",
    async (args, thunkAPI) => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${args}`);
            const data = await response.json();
            return data;

        }
        catch (error) {
            return rejectwithValue(error.message);


        }
    }

)
const Slicer1 = createSlice({
    name: "Slice1",
    initialState: { data: [], loading: false, error: null },
    reducers: {
        // Define your reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(FetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})