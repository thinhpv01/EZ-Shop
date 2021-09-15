import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { NavLink, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        columnGap: '6rem',
        listStyle: 'none',
        '& a': {
            color: '#555',
            textDecoration: 'none',
            '&.active': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
                textUnderlineOffset: '.4rem',
            },
        },
    },
}));
function ProductMenu(props) {
    const classes = useStyles();
    const { url } = useRouteMatch();
    return (
        <Box component="ul" className={classes.root}>
            <li>
                <NavLink to={url} exact>
                    Description
                </NavLink>
            </li>
            <li>
                <NavLink to={`${url}/additional`}>Additional</NavLink>
            </li>
            <li>
                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
        </Box>
    );
}

export default ProductMenu;
