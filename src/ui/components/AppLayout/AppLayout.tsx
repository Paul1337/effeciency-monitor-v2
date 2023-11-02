import { FC, ReactNode } from 'react';

interface IAppLayoutProps {
    children: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = props => {
    const { children } = props;
    return <div>{children}</div>;
};
