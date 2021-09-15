import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import ProductInfo from '../components/ProductInfo';
import { useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import productApi2 from 'api2/productApi';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductAdditional from 'features/Product/components/ProductAdditional';
import ProductReviews from 'features/Product/components/ProductReviews';
import ProductDescription from '../components/ProductDescription';
import { useDispatch } from 'react-redux';
import { addToCart } from 'features/Cart2/CartSlice';
const useStyles = makeStyles((theme) => ({
    left: {
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[400]}`,
    },
    right: {
        padding: theme.spacing(1.5),
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
}));
DetailPage.propTypes = {};

function DetailPage(props) {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const classes = useStyles();
    const params = useParams();
    const { productId } = params;
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const result = await productApi2.get(productId);
                setProduct(result);
            } catch (error) {
                console.log('fail to fetch product:', error);
            }
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <Box style={{ transform: 'translateY(-1.7rem)' }}>
                <LinearProgress />
            </Box>
        );
    }

    const handleAddToCart = ({ quantity }) => {
        const action = addToCart({
            id: product.id,
            product,
            quantity,
        });
        dispatch(action);
        console.log(action);
    };

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item xs={5} className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item xs={7} className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCart} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <ProductMenu />
            <Switch>
                <Route path={url} exact>
                    <ProductDescription product={product} />
                </Route>
                <Route path={`${url}/additional`} component={ProductAdditional} />
                <Route path={`${url}/reviews`} component={ProductReviews} />
            </Switch>
        </Box>
    );
}

export default DetailPage;
