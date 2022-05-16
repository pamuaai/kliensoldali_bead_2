import { configureStore } from "@reduxjs/toolkit";

import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";
import tasksApiSlice from "./tasksApiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        authApi: authApiSlice.reducer,
        tasksApi: tasksApiSlice.reducer,
    }
});
