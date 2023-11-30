import {
    Button,
    Card,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { EAuthType } from './AuthenticationPage';
import { useAppDispatch } from '../../../domain/redux/store';
import { thunkRegister } from '../../../domain/redux/services/auth/register';
import { validateEmail, validatePassword } from './validation';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleRepeatedPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
        setRepeatedPassword(e.target.value);

    const authContext = useContext(AuthContext);

    const handleLoginClick = () => authContext?.setAuthType(EAuthType.Login);

    const handleRegister = () => {
        if (password !== repeatedPassword) {
            setError('Passwords do not match!');
            return;
        }
        const thunkReg = thunkRegister({
            email,
            password,
        });
        dispatch(thunkReg).then(regResult => {
            if (regResult.error) {
                setError(regResult.error);
            } else {
                authContext?.setAuthType(EAuthType.Login);
            }
        });
    };

    useEffect(() => {
        if (!validateEmail(email)) {
            setError('Email is not valid');
        } else if (!validatePassword(password)) {
            setError('Password is not valid');
        } else if (password !== repeatedPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    }, [password, email, repeatedPassword]);

    return (
        <Card p={2} m={2} w={400} minH={430}>
            <Heading textAlign={'center'} m={3}>
                Registration
            </Heading>
            <FormControl isInvalid={!validateEmail(email) && email.length > 0}>
                <FormLabel>Email</FormLabel>
                <Input value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl isInvalid={!validatePassword(password) && password.length > 0}>
                <FormLabel>Password</FormLabel>
                <Input type='password' value={password} onChange={handlePasswordChange} />
            </FormControl>
            <FormControl isInvalid={repeatedPassword !== password && repeatedPassword.length > 0}>
                <FormLabel>Repeat Password</FormLabel>
                <Input
                    type='password'
                    value={repeatedPassword}
                    onChange={handleRepeatedPasswordChange}
                />
            </FormControl>
            <Button
                isDisabled={
                    repeatedPassword !== password || !validateEmail(email) || !validatePassword(password)
                }
                mt={3}
                onClick={handleRegister}
            >
                Register
            </Button>
            <Text
                color={'green.500'}
                fontWeight={700}
                m={2}
                cursor={'pointer'}
                textAlign={'center'}
                onClick={handleLoginClick}
            >
                Already have an account? Click here to log in
            </Text>
            <Text textAlign={'center'} color='red' m={2}>
                {error}
            </Text>
        </Card>
    );
};
