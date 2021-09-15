import axiosClient2 from 'api2/axiosClient';

const productApi2 = {
    async getAll(params) {
        // Transform _page to _start
        const newParams = { ...params };
        newParams._start =
            !params._page || params._page <= 1
                ? 0
                : (params._page - 1) * (params._limit || 50);
        // Remove un-needed key
        delete newParams._page;
        // Fetch product list + count
        const productList = await axiosClient2.get('/products', { params: newParams });
        const count = await axiosClient2.get('/products/count', { params: newParams });
        // Build response and return
        return {
            data: productList,
            pagination: {
                page: params._page,
                limit: params._limit,
                total: count,
            },
        };
    },
    get(id) {
        const url = `/products/${id}`;
        return axiosClient2.get(url);
    },

    add(data) {
        const url = '/products';
        return axiosClient2.post(url, data);
    },

    update(data) {
        const url = `/products/${data.id}`;
        return axiosClient2.patch(url, data);
    },

    remove(id) {
        const url = `/products/${id}`;
        return axiosClient2.delete(url);
    },
};

export default productApi2;
