import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, makeStyles } from '@material-ui/core';
import QuantityField2 from 'components/form-control/QuantityField2';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm(props) {
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Please enter quantity')
            .min(1, 'Please enter at least 1')
            .typeError('Please enter a Number'),
    });
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    };
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box style={{ width: '180px' }}>
                <QuantityField2 label="Quantity" name="quantity" form={form} />
            </Box>
            <Button
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                style={{ width: '150px' }}
            >
                Add To Cart
            </Button>
        </form>
    );
}

export default AddToCartForm;
