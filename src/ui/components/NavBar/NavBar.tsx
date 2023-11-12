import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';

type TNavlink = (typeof config.navLinks)[0];
const getNavlinkKey = (navLink: TNavlink, index: number) => navLink.text + navLink.to + index;

export const NavBar = () => {
    return (
        <HStack m={3}>
            {config.navLinks.map((navLink, index) => (
                <Box key={getNavlinkKey(navLink, index)} padding={'4px'} minW={100} textAlign={'center'}>
                    <Link to={navLink.to}>{navLink.text}</Link>
                </Box>
            ))}
        </HStack>
    );
};
