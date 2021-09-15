import { createSlice } from '@reduxjs/toolkit';

const CartSlice2 = createSlice({
    name: 'cart2',
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },
        hiddenMiniCart(state) {
            state.showMiniCart = false;
        },
        addToCart(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex((x) => x.id === newItem.id);
            if (index >= 0) state.cartItems[index].quantity += newItem.quantity;
            else state.cartItems.push(newItem);
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) state.cartItems[index].quantity = quantity;
        },
        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
        },
    },
});

const { actions, reducer } = CartSlice2;
export const { showMiniCart, hiddenMiniCart, addToCart, setQuantity, removeFromCart } = actions;

export default reducer;