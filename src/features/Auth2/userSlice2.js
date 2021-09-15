import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi2 from 'api2/userApi';

export const register = createAsyncThunk('user/register', async (payload) => {
    const data = await userApi2.register(payload);
    localStorage.setItem('access_token', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
});
export const login = createAsyncThunk('user/login', async (payload) => {
    const data = await userApi2.login(payload);
    localStorage.setItem('access_token', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data.user;
});

const userSlice2 = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            state.current = {};
        },
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { actions, reducer } = userSlice2;
export const { logout } = actions;
export default reducer;
