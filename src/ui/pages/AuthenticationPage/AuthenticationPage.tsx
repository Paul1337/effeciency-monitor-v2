import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegForm';
import { Flex } from '@chakra-ui/react';

export enum EAuthType {
    Login,
    Register,
}

export const authType = EAuthType.Login;

export const AuthenticationFormWrapper: FC<PropsWithChildren> = props => {
    const { children } = props;

    return (
        <Flex justifyContent={'center'} alignItems={'center'} flex={1}>
            {children}
        </Flex>
    );
};

export const AuthenticationPage: FC = props => {
    const [authType, setAuthType] = useState(EAuthType.Login);

    let loginForm: ReactNode | null = null;
    switch (authType) {
        case EAuthType.Login:
            loginForm = <LoginForm />;
            break;
        case EAuthType.Register:
            loginForm = <RegisterForm />;
            break;
    }

    return <AuthenticationFormWrapper>{loginForm}</AuthenticationFormWrapper>;
};
