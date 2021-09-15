import React from 'react';
import PropTypes from 'prop-types';
import { login, register } from 'features/Auth2/userSlice2';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm2 from '../LoginForm';

Login2.propTypes = {
    closeDialog: PropTypes.func,
};

function Login2(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            const { closeDialog } = props;
            if (closeDialog) closeDialog();
            console.log('new user: ', user);
        } catch (error) {
            console.log('fail to register: ', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };
    return (
        <div>
            <LoginForm2 onSubmit={handleSubmit} />
        </div>
    );
}

export default Login2;
