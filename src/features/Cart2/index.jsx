import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartItemsTotalSelector } from './selectors';

CartFeature2.propTypes = {};

function CartFeature2(props) {
    const totalItemsPrice = useSelector(cartItemsTotalSelector);
    const items = useSelector((state) => state.cart2.cartItems);
    console.log(items);
    return <div>CartFeature {totalItemsPrice}</div>;
}

export default CartFeature2;
