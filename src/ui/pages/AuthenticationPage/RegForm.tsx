import { Button, Card, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const RegisterForm = () => {
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleRepeatedPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
        setRepeatedPassword(e.target.value);

    return (
        <Flex justifyContent={'center'}>
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
                <Button mt={3}>Register</Button>
            </Card>
        </Flex>
    );
};
