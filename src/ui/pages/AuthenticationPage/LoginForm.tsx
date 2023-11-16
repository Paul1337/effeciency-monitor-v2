import { Button, Card, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { EAuthType } from './AuthenticationPage';

export const LoginForm = () => {
    const authContext = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleRegisterClick = () => {
        authContext?.setAuthType(EAuthType.Register);
    };

    return (
        <Card p={2} m={2} w={400}>
            <Heading textAlign={'center'} m={3}>
                Login
            </Heading>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input value={password} onChange={handlePasswordChange} />
            </FormControl>
            <Button mt={3}>Login</Button>
            <Text
                color={'red'}
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
