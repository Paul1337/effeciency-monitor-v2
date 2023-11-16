import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSliceScheme } from './types';

const initialState: IUserSliceScheme = {
    isLogged: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogged(state: IUserSliceScheme, action: PayloadAction<boolean>) {
            state.isLogged = action.payload;
        },
        logout(state: IUserSliceScheme) {
            state.isLogged = false;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
