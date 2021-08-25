import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-control/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit = null}) {
    const schema = yup.object().shape({
        quantity: yup.number().min(1, 'Please Enter at least 1!').required('Please enter quantity'),
    });
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    })
    
    const handleSubmit = async (values) => {
        if(onSubmit) {
            await onSubmit(values);
        } 
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField label="Quantity" name="quantity" form={form} />
            <Button type="submit" variant="contained" color="primary" style={{width: '200px'}} size="large">
                Add To Cart
            </Button>
        </form>
    );
}

export default AddToCartForm;