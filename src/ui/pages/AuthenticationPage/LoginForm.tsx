import { Button, Card, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

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
        </Card>
    );
};
