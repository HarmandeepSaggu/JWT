import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Replace with your actual API
  withCredentials: true,
});

// Request Interceptor - Attach token to headers
api.interceptors.request.use(
  async (config) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
        
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error attaching token', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized - Redirecting to login');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
