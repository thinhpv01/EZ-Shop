import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-key';

export const register = createAsyncThunk('user/register', async (payload) => {
    //call API to register
    const data = await userApi.register(payload);
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    //save data to local storage

    return data.user;
});
export const login = createAsyncThunk('user/login', async (payload) => {
    //call API to register
    const data = await userApi.login(payload);
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    //save data to local storage

    return data.user;
});

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(StorageKeys.USE);
            localStorage.removeItem(StorageKeys.TOKEN);
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

const { actions, reducer } = counterSlice;
export const { logout } = actions;
export default reducer;
