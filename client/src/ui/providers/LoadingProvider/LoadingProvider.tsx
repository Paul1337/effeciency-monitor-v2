import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../../domain/redux/store';
import { thunkLoadData } from '../../../domain/redux/services/loadData';

interface ILoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider = (props: ILoadingProviderProps) => {
    const { children } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(thunkLoadData());
    }, []);

    return <>{children}</>;
};
