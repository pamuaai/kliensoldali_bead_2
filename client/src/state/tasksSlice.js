import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: { totalTasks: null, limitTasks: null, skipTasks: null, tasks: null },
    reducers: {
        setTasks: (
            state,
            { payload: { total, limit, skip, data } }
        ) => {
            state.totalTasks = total;
            state.limitTasks = limit;
            state.skipTasks = skip;
            state.tasks = data;
        },
    },
})

export const { setTasks } = slice.actions

export default slice.reducer