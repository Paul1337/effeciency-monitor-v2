import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData, IUserSliceScheme } from './types';

const initialState: IUserSliceScheme = {
    isLogged: false,
    userData: null,
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
        setUserData(state: IUserSliceScheme, action: PayloadAction<IUserData>) {
            state.userData = action.payload;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
