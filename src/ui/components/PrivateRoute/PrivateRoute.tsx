import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isLogged = useSelector((state: RootState) => state.user.isLogged);
    return isLogged ? <Outlet /> : <Navigate to={'/auth'} />;
};
