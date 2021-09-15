import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/form-control/InputField';
import { LockOutlined } from '@material-ui/icons';
import {
    Avatar,
    Button,
    LinearProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import PasswordField2 from 'components/form-control/PasswordField2';

RegisterForm2.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '2rem',
    },
    icon: {
        fontSize: '1.5rem',
        background: theme.palette.secondary.main,
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        margin: '1rem 0 2rem',
    },
    button: {
        margin: '1.5rem 0 1rem  ',
    },
    progress: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
}));

function RegisterForm2(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Please enter your full name!')
            .test(
                'Should has at least two words',
                'Please enter at least two words!',
                (values) => {
                    return values.split(' ').length >= 2;
                }
            ),
        email: yup
            .string()
            .required('Please enter your email!')
            .email('Please enter a valid email!'),
        password: yup
            .string()
            .required('Please enter your password')
            .min(6, 'Please enter at least 6 characters'),
        retypePassword: yup
            .string()
            .required('Please enter your password')
            .oneOf([yup.ref('password')], 'Password does not match'),
    });
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    };
    const { isSubmitting } = form.formState;
    return (
        <form className={classes.root} onSubmit={form.handleSubmit(handleSubmit)}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.icon}>
                <LockOutlined />
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create An Account
            </Typography>
            <InputField label="Full Name" name="fullName" form={form} />
            <InputField label="Email" name="email" form={form} />
            <PasswordField2 label="Password" name="password" form={form} />
            <PasswordField2 label="Retype Password" name="retypePassword" form={form} />
            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
            >
                CREATE AN ACCOUNT
            </Button>
        </form>
    );
}

export default RegisterForm2;
