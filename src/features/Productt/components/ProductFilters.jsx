import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FIlterByService from './Filters/FIlterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function ProductFilters({ filters = {}, onChange = null }) {
    const handleCategoryChange = (newCategoryId) => {
        const newFilters = {
            'category.id': newCategoryId,
        };
        if (onChange) onChange(newFilters);
    };
    const handleChange = (values) => {
        if (onChange) onChange(values);
    };
    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FIlterByService onChange={handleChange} filters={filters} />
        </Box>
    );
}

export default ProductFilters;
