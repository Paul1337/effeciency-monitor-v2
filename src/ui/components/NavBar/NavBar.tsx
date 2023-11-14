import { Box, HStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../domain/redux/store';
import { INavItem, useNavItems } from './useNavItems';

const getNavItemKey = (navLink: INavItem, index: number) => navLink.text + navLink.to + index;

export const NavBar = () => {
    const isLogged = useSelector((state: RootState) => state.user.isLogged);
    const navItems = useNavItems(isLogged);

    return (
        <HStack m={3} borderBottom={'1px solid'} borderColor={'gray.200'}>
            {navItems.map((navItem, index) => (
                <Box key={getNavItemKey(navItem, index)} padding={'4px'} minW={100} textAlign={'center'}>
                    <Link to={navItem.to}>{navItem.text}</Link>
                </Box>
            ))}
        </HStack>
    );
};
