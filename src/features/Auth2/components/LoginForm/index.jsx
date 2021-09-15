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

LoginForm2.propTypes = {
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

function LoginForm2(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        identifier: yup
            .string()
            .required('Please enter your email!')
            .email('Please enter a valid email!'),
        password: yup.string().required('Please enter your password'),
    });
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                Sign In
            </Typography>
            <InputField label="Email" name="identifier" form={form} />
            <PasswordField2 label="Password" name="password" form={form} />
            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
            >
                Sign In
            </Button>
        </form>
    );
}

export default LoginForm2;
