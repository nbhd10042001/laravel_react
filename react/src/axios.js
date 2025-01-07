import axios from 'axios';
import router from './router';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    // baseURL: `${import.meta.env.VITE_API_HOST_URL}/api`,
    // baseURL: `https://api.mydemoapp.io.vn/api`,
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
    // get csrfToken from tag meta and set token in header request
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, error => {
    if(error.response && error.response.status === 401){
        localStorage.removeItem('TOKEN');
        window.location.reload();
        // router.navigate('/login')
        return error;
    }
    throw error;
});

export default axiosClient;