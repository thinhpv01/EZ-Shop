import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi2 from 'api2/productApi';
import ProductSkeletonList from 'features/Productt/components/ProductSkeletonList';
import ProductList from 'features/Productt/components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from 'features/Productt/components/ProductSort';
import ProductFilters from 'features/Productt/components/ProductFilters';
import FilterViewer from 'features/Productt/components/Filters/FilterViewer';
import { useHistory, useLocation } from 'react-router';
import QueryString from 'query-string';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
}));

function ListPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = QueryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 9,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    }, [location.search]);

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [filters, setFilter] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 9,
    //     _sort: queryParams._sort || 'salePrice:ASC',
    // }));

    const [pagination, setPagination] = useState({
        limit: 9,
        page: 1,
        total: 1,
    });
    // useEffect(() => {
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: QueryString.stringify(filters),
    //     });
    // }, [filters, history]);
    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi2.getAll(queryParams);
                console.log(data, pagination);
                setPagination(pagination);
                setProductList(data);
            } catch (error) {
                console.log('Fail to fetch product list: ', error);
            }
            setLoading(false);
        })();
    }, [queryParams]);
    const handlePaginationChange = (e, page) => {
        // setFilter((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page,
        // }));
        const filters = {
            ...queryParams,
            _page: page,
        };
        history.push({
            pathname: history.location.pathname,
            search: QueryString.stringify(filters),
        });
    };
    const handleSortChange = (newSortValue) => {
        // setFilter((prevFilters) => ({
        //     ...prevFilters,
        //     _sort: newSortValue,
        // }));
        const filters = {
            ...queryParams,
            _sort: newSortValue,
        };
        history.push({
            pathname: history.location.pathname,
            search: QueryString.stringify(filters),
        });
    };
    const handleFiltersChange = (newFilters) => {
        // setFilter((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters,
        // }));
        const filters = {
            ...queryParams,
            ...newFilters,
        };
        history.push({
            pathname: history.location.pathname,
            search: QueryString.stringify(filters),
        });
    };
    const setNewFilters = (newFilters) => {
        history.push({
            pathname: history.location.pathname,
            search: QueryString.stringify(newFilters),
        });
    };
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters
                                filters={queryParams}
                                onChange={handleFiltersChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0} style={{ paddingBottom: '5rem' }}>
                            <ProductSort
                                currentSort={queryParams._sort}
                                onChange={handleSortChange}
                            />
                            <FilterViewer
                                filters={queryParams}
                                onChange={setNewFilters}
                            />
                            {loading ? (
                                <ProductSkeletonList length={9} />
                            ) : (
                                <ProductList data={productList} />
                            )}
                            <Box className={classes.pagination}>
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePaginationChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
