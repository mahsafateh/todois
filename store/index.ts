import { configureStore } from '@reduxjs/toolkit';
import todosReducer from "../slices/todosSlice";
import filtersReducer from "../slices/filtersSlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        filters: filtersReducer,
    },
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch