import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:8081/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('erp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors & 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      toast.error('Session Expired', {
        description: 'Please sign in again to continue.',
      });
      localStorage.removeItem('erp_token');
      localStorage.removeItem('erp_user');
      window.location.href = '/login';
    } else if (status === 403) {
      toast.error('Access Denied', {
        description: 'You do not have permission to view this resource.',
      });
    } else if (status >= 500) {
      toast.error('Server Node Error', {
        description: 'Institutional server is currently unsynchronized. Retrying...',
      });
    } else if (!status) {
      toast.warning('Network Connection Fault', {
        description: 'Unable to reach the high-speed ERP node.',
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
