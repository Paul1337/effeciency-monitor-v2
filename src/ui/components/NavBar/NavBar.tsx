import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';

export const NavBar = () => {
    return (
        <HStack m={3}>
            {config.navLinks.map(navLink => (
                <Box padding={'4px'} minW={100} textAlign={'center'}>
                    <Link to={navLink.to}>{navLink.text}</Link>
                </Box>
            ))}
        </HStack>
    );
};
