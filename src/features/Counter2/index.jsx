import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './CounterSlice';

CounterFeature2.propTypes = {};

function CounterFeature2(props) {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.count2);
    const handleIncreaseClick = () => {
        dispatch(increase());
    };
    const handleDecreaseClick = () => {
        dispatch(decrease());
    };
    return (
        <div>
            <h1>counter {count}</h1>
            <button onClick={handleIncreaseClick}>Increase</button>
            <button onClick={handleDecreaseClick}>Decrease</button>
        </div>
    );
}

export default CounterFeature2;
