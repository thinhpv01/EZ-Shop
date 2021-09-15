import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Checkbox,
    FormControlLabel,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { filter } from 'dom-helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[400]}`,
    },
    list: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        '$ > li': {
            margin: 0,
        },
    },
}));

FIlterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

function FIlterByService({ onChange = null, filters = {} }) {
    const classes = useStyles();
    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (onChange) onChange({ [name]: checked });
    };
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Dịch Vụ</Typography>
            <ul className={classes.list}>
                {[
                    { value: 'isPromotion', label: 'Có Khuyễn Mãi' },
                    { value: 'isFreeShip', label: 'Vận Chuyển Miễn phí' },
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color="primary"
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FIlterByService;
