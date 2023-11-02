import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { dealsReducer } from '../slices/deals/dealsSlice';
import { useDispatch } from 'react-redux';
import { historyReducer } from '../slices/history/historySlice';
import { plansReducer } from '../slices/plans/plansSlice';

export const store = configureStore({
    reducer: combineReducers({
        deals: dealsReducer,
        history: historyReducer,
        plans: plansReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
