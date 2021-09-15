import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice';
import userReducer2 from '../features/Auth2/userSlice2';
import cartReducer from '../features/Cart/CartSlice';
import cartReducer2 from '../features/Cart2/CartSlice';
import counterReducer from '../features/Counter/CounterSlice';
import counterReducer2 from '../features/Counter2/CounterSlice';

const rootReducer = {
    count: counterReducer,
    count2: counterReducer2,
    cart: cartReducer,
    user: userReducer,
    user2: userReducer2,
    cart2: cartReducer2,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
