import { authApi } from '../../../../api/auth';
import { AppThunk } from '../../store';

interface IThunkRegister {
    email: string;
    password: string;
}

export const thunkRegister = (data: IThunkRegister): AppThunk<Promise<boolean>> => {
    return async (dispatch): Promise<boolean> => {
        try {
            const response = await authApi.register(data);
            console.log('Register response', response);
            return true;
        } catch (err) {
            console.log('Error registering', err);
            return false;
        }
    };
};
