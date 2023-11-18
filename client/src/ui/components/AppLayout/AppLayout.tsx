import { FC, ReactNode } from 'react';
import cls from './AppLayout.module.css';

interface IAppLayoutProps {
    children: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = props => {
    const { children } = props;
    return <div className={cls.layout}>{children}</div>;
};
