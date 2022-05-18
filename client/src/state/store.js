import { configureStore } from "@reduxjs/toolkit";

import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";
import editSlice from "./editSlice";
import taskListsApiSlice from "./taskListsApiSlice";
import tasksApiSlice from "./tasksApiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        edit: editSlice,
        authApi: authApiSlice.reducer,
        tasksApi: tasksApiSlice.reducer,
        taskListsApi: taskListsApiSlice.reducer,
    }
});
