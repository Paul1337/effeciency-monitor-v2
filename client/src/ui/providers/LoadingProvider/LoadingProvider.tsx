import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../../domain/redux/store';
import { thunkLoadData } from '../../../domain/redux/services/loadData';
import { thunkLoadUserData } from '../../../domain/redux/services/auth/loadUserData';

interface ILoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider = (props: ILoadingProviderProps) => {
    const { children } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(thunkLoadUserData());
        dispatch(thunkLoadData());
    }, []);

    return <>{children}</>;
};
