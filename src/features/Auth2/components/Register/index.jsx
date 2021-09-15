import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm2 from '../RegisterForm';
import { register } from 'features/Auth2/userSlice2';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register2.propTypes = {
    closeDialog: PropTypes.func,
};

function Register2(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            const { closeDialog } = props;
            if (closeDialog) closeDialog();
            console.log('new user: ', user);
            enqueueSnackbar('Register Successfully!!!', { variant: 'success' });
        } catch (error) {
            console.log('fail to register: ', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };
    return (
        <div>
            <RegisterForm2 onSubmit={handleSubmit} />
        </div>
    );
}

export default Register2;
