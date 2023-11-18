import { createContext } from 'react';
import { EAuthType } from './AuthenticationPage';

interface IAuthContext {
    setAuthType: (type: EAuthType) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
