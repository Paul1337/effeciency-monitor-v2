import axios from 'axios';
import { getAuthToken } from '../domain/data/localStorage/auth';

const authToken = getAuthToken();

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
