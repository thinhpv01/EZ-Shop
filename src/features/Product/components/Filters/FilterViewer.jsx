import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
        }
    },
}))

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao Hang Mien Phi',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            const newFilters = {...filters};
            if(newFilters.isFreeShip)
                delete newFilters.isFreeShip;
            else
                newFilters.isFreeShip = true;

            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => 'Co Khuyen Mai',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.isPromotion;
            return newFilters
        },
        onToggle: null,
    },
    {
        id: 3,
        getLabel: (filters) => `Tu ${filters.salePrice_gte} Den ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;
            return newFilters
        },
        onToggle: null,
    },
]
FilterViewer.propTypes = {
    filters: PropTypes.object,
    onchange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
    const classes = useStyles();
    const visibleFilter = useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    }, [filters])
    return (
        <Box component="ul" className={classes.root}>
            {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        size="small"
                        onClick={x.isRemovable ? null : () => {
                            if(!onChange) return;
                            const newFilters = x.onToggle(filters);
                            onChange(newFilters);
                        }}
                        onDelete={x.isRemovable ? () => {
                            if(!onChange) return;
                            const newFilters = x.onRemove(filters);
                            onChange(newFilters);
                        } : null}
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;