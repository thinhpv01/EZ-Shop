import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/form-control/InputField';
import {
    Avatar,
    Button,
    LinearProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from 'components/form-control/PasswordField';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 4, 0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },
    progress: {
        position: 'absolute',
        top: theme.spacing(0),
        left: 0,
        right: 0,
    },
}));
RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Please enter your full name!')
            .test(
                'should has at least two words.',
                'Please enter at least two words.',
                (value) => {
                    return value.split(' ').length >= 2;
                }
            ),
        email: yup
            .string()
            .required('Please enter your email.')
            .email('Please enter a valid email'),
        password: yup
            .string()
            .required('Please enter your password')
            .min(6, 'Please enter at least 6 characters.'),
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
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography className={classes.title} component="h3" variant="h5">
                Create An Account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField label="Full Name" name="fullName" form={form} />
                <InputField label="Email" name="email" form={form} />
                <PasswordField label="Password" name="password" form={form} />
                <PasswordField
                    label="Retype Password"
                    name="retypePassword"
                    form={form}
                />
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                >
                    Create An Account
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
