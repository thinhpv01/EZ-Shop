import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, makeStyles, Box, LinearProgress } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail'
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReviews from '../components/ProductReviews';
import { useDispatch } from 'react-redux';
import { addToCart } from 'features/Cart/CartSlice';

DetailPage.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: theme.spacing(3)
    },
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[400]}`
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        paddingBottom: '20px', 
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
}))

function DetailPage(props) {
    const classes = useStyles();
    const {params: { productId }, url} = useRouteMatch();
    const dispatch = useDispatch();
    
    const { product, loading } = useProductDetail(productId);

    if(loading) {
        return <Box className={classes.loading}>
            <LinearProgress />
        </Box>
    }

    const handleAddToCartSubmit = ({ quantity }) => {
        dispatch(addToCart({
            id: product.id,
            product,
            quantity,
        }))
    }
    
    return (
        <Container>
            <Paper elevation={0}>
                <Grid container>
                    <Grid item className={classes.left}>
                        <ProductThumbnail product={product} />
                    </Grid>
                    <Grid item className={classes.right}>
                        <ProductInfo product={product} />
                        <AddToCartForm onSubmit={handleAddToCartSubmit} />
                    </Grid>
                </Grid>
            </Paper>
            <ProductMenu />

            <Switch>
                <Route path={url} exact>
                    <ProductDescription product={product} />
                </Route>
                <Route path={`${url}/additional`} exact>
                    <ProductAdditional product={product} />
                </Route>
                <Route path={`${url}/reviews`} exact>
                    <ProductReviews product={product} />
                </Route>
            </Switch>
        </Container>
    );
}

export default DetailPage;