import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSliceScheme } from './types';

const initialState: IUserSliceScheme = {
    isLogged: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogged(state: IUserSliceScheme, action: PayloadAction<boolean>) {
            state.isLogged = action.payload;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
