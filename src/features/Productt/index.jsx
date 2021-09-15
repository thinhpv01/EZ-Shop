import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from 'features/Productt/pages/ListPage';
import DetailPage from 'features/Productt/pages/DetailPage';

ProductFeature2.propTypes = {};

function ProductFeature2(props) {
    const match = useRouteMatch();
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.path} component={ListPage} exact />
                <Route path={`${match.path}/:productId`} component={DetailPage} />
            </Switch>
        </Box>
    );
}

export default ProductFeature2;
