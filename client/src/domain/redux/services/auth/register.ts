import { register } from '../../../../api/auth/register';
import { AppThunk } from '../../store';

interface IThunkRegister {
    email: string;
    password: string;
}

export const thunkRegister = (data: IThunkRegister): AppThunk<Promise<boolean>> => {
    return async (dispatch): Promise<boolean> => {
        try {
            const response = await register(data);
            console.log('Register response', response);
            return true;
        } catch (err) {
            console.log('Error registering', err);
            return false;
        }
    };
};
