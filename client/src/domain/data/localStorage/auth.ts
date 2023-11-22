import localStorageConfig from '../../../config/localStorage/localStorageConfig';

export const removeAuthToken = () => {
    localStorage.removeItem(localStorageConfig.AuthTokenKey);
};
