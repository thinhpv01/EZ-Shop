import axiosClient2 from 'api2/axiosClient';

const userApi2 = {
    register(data) {
        const url = '/auth/local/register';
        return axiosClient2.post(url, data);
    },
    login(data) {
        const url = '/auth/local';
        return axiosClient2.post(url, data);
    },
};

export default userApi2;
