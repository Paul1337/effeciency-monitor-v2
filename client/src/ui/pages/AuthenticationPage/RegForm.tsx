import { Button, Card, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { EAuthType } from './AuthenticationPage';
import { useAppDispatch } from '../../../domain/redux/store';
import { thunkRegister } from '../../../domain/redux/services/auth/register';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleRepeatedPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
        setRepeatedPassword(e.target.value);

    const authContext = useContext(AuthContext);

    const handleLoginClick = () => authContext?.setAuthType(EAuthType.Login);

    const handleRegister = () => {
        dispatch(
            thunkRegister({
                email,
                password,
            })
        ).then(regSuccess => {
            if (regSuccess) {
                authContext?.setAuthType(EAuthType.Login);
            }
        });
    };

    return (
        <Card p={2} m={2} w={400}>
            <Heading textAlign={'center'} m={3}>
                Registration
            </Heading>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input value={password} onChange={handlePasswordChange} />
            </FormControl>
            <FormControl>
                <FormLabel>Repeat Password</FormLabel>
                <Input value={repeatedPassword} onChange={handleRepeatedPasswordChange} />
            </FormControl>
            <Button mt={3} onClick={handleRegister}>
                Register
            </Button>
            <Text color={'red'} m={2} cursor={'pointer'} textAlign={'center'} onClick={handleLoginClick}>
                Already have an account? Click here to log in
            </Text>
        </Card>
    );
};
