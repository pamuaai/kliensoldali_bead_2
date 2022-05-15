import { configureStore } from "@reduxjs/toolkit";

import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        authApi: authApiSlice.reducer,
    }
});
