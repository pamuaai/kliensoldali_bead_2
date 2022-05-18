import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
    name: 'edit',
    initialState: { taskList: null },
    reducers: {
        setCurrentTaskList: (
            state,
            { payload: { taskList } }
        ) => {
            state.taskList = taskList;
        },
    },
})

export const { setCurrentTaskList } = editSlice.actions

export default editSlice.reducer

export const selectCurrentTaskList = (state) => {
    return state ? state.edit ? state.edit.taskList : null : null
};