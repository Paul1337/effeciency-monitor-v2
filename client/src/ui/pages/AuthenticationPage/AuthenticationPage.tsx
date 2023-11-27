import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegForm';
import { Flex } from '@chakra-ui/react';
import { AuthContext } from './AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { Navigate, useNavigate } from 'react-router-dom';

export enum EAuthType {
    Login,
    Register,
}

export const authType = EAuthType.Login;

export const AuthenticationFormWrapper: FC<PropsWithChildren> = (props) => {
    const { children } = props;

    return (
        <Flex justifyContent={'center'} alignItems={'center'} flex={1}>
            {children}
        </Flex>
    );
};

export const AuthenticationPage: FC = (props) => {
    const isLogged = useSelector((state: RootState) => state.user.isLogged);
    const [authType, setAuthType] = useState(EAuthType.Login);

    if (isLogged) return <Navigate to='/' />;

    let loginForm: ReactNode | null = null;
    switch (authType) {
        case EAuthType.Login:
            loginForm = <LoginForm />;
            break;
        case EAuthType.Register:
            loginForm = <RegisterForm />;
            break;
    }

    return (
        <AuthContext.Provider value={{ setAuthType }}>
            <AuthenticationFormWrapper>{loginForm}</AuthenticationFormWrapper>
        </AuthContext.Provider>
    );
};
