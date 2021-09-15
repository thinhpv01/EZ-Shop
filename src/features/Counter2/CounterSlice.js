import { createSlice } from '@reduxjs/toolkit';

const counterSlice2 = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increase(state) {
            return state + 1;
        },
        decrease(state) {
            return state - 1;
        },
    },
});

const { actions, reducer } = counterSlice2;
export const { increase, decrease } = actions;

export default reducer;
