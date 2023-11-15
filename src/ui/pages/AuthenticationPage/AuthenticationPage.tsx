import { FC } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegForm';

export enum EAuthType {
    Login,
    Register,
}

export const authType = EAuthType.Login;

interface IAuthenticationPageProps {
    authType: EAuthType;
}

export const AuthenticationPage: FC<IAuthenticationPageProps> = (props) => {
    const { authType } = props;
    switch (authType) {
        case EAuthType.Login:
            return <LoginForm />;
        case EAuthType.Register:
            return <RegisterForm />;
    }
};
