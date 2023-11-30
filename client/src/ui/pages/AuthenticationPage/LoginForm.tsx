import { Button, Card, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { EAuthType } from './AuthenticationPage';
import { useAppDispatch } from '../../../domain/redux/store';
import { thunkLogIn } from '../../../domain/redux/services/auth/logIn';
import { validateEmail, validatePassword } from './validation';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const authContext = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleRegisterClick = () => {
        authContext?.setAuthType(EAuthType.Register);
    };

    const handleLogin = () => {
        dispatch(
            thunkLogIn({
                email,
                password,
            })
        );
    };

    return (
        <Card p={2} m={2} w={400}>
            <Heading textAlign={'center'} m={3}>
                Login
            </Heading>
            <FormControl isInvalid={!validateEmail(email) && email.length > 0}>
                <FormLabel>Email</FormLabel>
                <Input value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl isInvalid={!validatePassword(password) && password.length > 0}>
                <FormLabel>Password</FormLabel>
                <Input type='password' value={password} onChange={handlePasswordChange} />
            </FormControl>
            <Button
                isDisabled={!validateEmail(email) || !validatePassword(password)}
                mt={3}
                onClick={handleLogin}
            >
                Login
            </Button>
            <Text
                color={'green.500'}
                fontWeight={700}
                m={2}
                cursor={'pointer'}
                textAlign={'center'}
                onClick={handleRegisterClick}
            >
                Don't have an account? Click here to register
            </Text>
        </Card>
    );
};
