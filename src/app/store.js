import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/CartSlice';
import counterReducer from '../features/Counter/CounterSlice';

const rootReducer = {
    count: counterReducer,
    cart: cartReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store