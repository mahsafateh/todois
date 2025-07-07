import { createSlice } from "@reduxjs/toolkit";
import { FiltersState } from "@/types/todo"

const initialState: FiltersState = {
    currentFilter: 'all'
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilter(state, action) {
            state.currentFilter = action.payload;
        },
        clearCompleted() {
            // This will be handled in the todos slice
            return;
        }
    },
});

export const { setFilter, clearCompleted } = filtersSlice.actions;
export default filtersSlice.reducer;