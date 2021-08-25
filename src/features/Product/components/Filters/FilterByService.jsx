import { Box, Button, TextField, Typography, makeStyles, FormControlLabel, Checkbox } from '@material-ui/core';
import { MicNone } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[400]}`
    },
    list: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        '$ > li':{
            margin: 0,
        }
    }
}))

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterByService({ filters = {}, onChange }) {
    const classes = useStyles();
    const handleChange = (e) => {
        if(!onChange) return;
        const {name, checked} = e.target;
        onChange({[name]: checked})
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Dịnh Vụ</Typography>
            <ul className={classes.list}>
                {[
                    {value: 'isPromotion', label: 'Có Khuyễn Mãi'}, 
                    {value: 'isFreeShip', label: 'Vận Chuyển Miễn phí'},
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

export default FilterByService;