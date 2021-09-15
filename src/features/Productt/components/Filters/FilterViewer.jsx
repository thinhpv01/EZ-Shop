import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        margin: theme.spacing(2, 0),
        listStyle: 'none',
        padding: 0,

        '& > li': {
            margin: 0,
            padding: theme.spacing(1),
        },
    },
}));

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Vận chuyển miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            const newFilters = { ...filters };
            if (filters.isFreeShip) delete newFilters.isFreeShip;
            else newFilters.isFreeShip = true;
            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => 'Co khuyen mai',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) => `Tu ${filters.salePrice_gte} Den ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('salePrice_lte') &&
            Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 4,
        getLabel: (filters) => {
            switch (filters['category.id']) {
                case 1: {
                    return 'Thời trang';
                    break;
                }
                case 2: {
                    return 'Khẩu trang';
                    break;
                }
                case 3: {
                    return 'Làm đẹp';
                    break;
                }
                case 4: {
                    return 'Laptop';
                    break;
                }
                case 5: {
                    return 'Ổ cứng';
                    break;
                }
                case 6: {
                    return 'Điện thoại';
                    break;
                }
                default: {
                    return;
                }
            }
        },
        isActive: () => true,
        isVisible: (filters) => filters['category.id'],
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters['category.id'];
            return newFilters;
        },
        onToggle: () => {},
    },
];

function FilterViewer({ filters = {}, onChange = null }) {
    const classes = useStyles();
    const isVisibleFilters = useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    }, [filters]);
    return (
        <Box component="ul" className={classes.root}>
            {isVisibleFilters.map((x) => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        size="small"
                        onClick={
                            x.isRemovable
                                ? null
                                : () => {
                                      const newFilters = x.onToggle(filters);
                                      if (onChange) onChange(newFilters);
                                  }
                        }
                        onDelete={
                            x.isRemovable
                                ? () => {
                                      const newFilters = x.onRemove(filters);
                                      if (onChange) onChange(newFilters);
                                  }
                                : null
                        }
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;
