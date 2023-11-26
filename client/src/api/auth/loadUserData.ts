import { getAuthToken } from '../../domain/data/localStorage/auth';
import { axiosInstance } from '../instance';

export const loadUserData = async () => {
    const token = getAuthToken();
    return axiosInstance
        .get('/users/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res.data);
};
