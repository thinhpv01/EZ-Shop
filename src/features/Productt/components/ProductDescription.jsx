import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

ProductDescription.propTypes = {
    product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
    console.log(product);
    return (
        <Paper elevation={0}>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </Paper>
    );
}

export default ProductDescription;
