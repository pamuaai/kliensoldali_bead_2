import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (
            state,
            { payload: { user, accessToken } }
        ) => {
            console.log(user, accessToken);
            state.user = user;
            state.token = accessToken;
        },
    },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state ? state.auth ? state.auth.user : null : null;