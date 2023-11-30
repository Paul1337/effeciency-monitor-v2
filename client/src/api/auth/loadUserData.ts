import { getAuthToken } from '../../domain/data/localStorage/auth';
import { axiosInstance } from '../instance';

export const loadUserData = async () => {
    return axiosInstance.get('/users/me').then(res => res.data);
};
