import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { formatPrice } from 'utils/common.';
import { useHistory } from 'react-router';

Product.propTypes = {
    product: PropTypes.object,
};

function Product({ product = {} }) {
    const history = useHistory();
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail.url}`
        : THUMBNAIL_PLACEHOLDER;
    const handleClick = () => {
        history.push(`/productst/${product.id}`);
    };
    return (
        <Box padding={1} onClick={handleClick}>
            <Box padding={1}>
                <img src={thumbnailUrl} width="100%" alt={Product.name}></img>
                <Typography variant="body2">{product.name}</Typography>
                <Typography>
                    <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                        {formatPrice(product.salePrice)}
                    </Box>
                    {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
                </Typography>
            </Box>
        </Box>
    );
}

export default Product;
