import { Box, Button, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../domain/redux/store';
import { INavItem, useNavItems } from './useNavItems';
import { userActions } from '../../../domain/redux/slices/user/userSlice';

const getNavItemKey = (navLink: INavItem, index: number) => navLink.text + navLink.to + index;

export const NavBar = () => {
    const isLogged = useSelector((state: RootState) => state.user.isLogged);
    const navItems = useNavItems(isLogged);
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(userActions.logout());
    };

    return (
        <HStack m={3} borderBottom={'1px solid'} borderColor={'gray.200'}>
            {navItems.map((navItem, index) => (
                <Box key={getNavItemKey(navItem, index)} padding={'4px'} minW={100} textAlign={'center'}>
                    <Link to={navItem.to}>{navItem.text}</Link>
                </Box>
            ))}
            {isLogged && (
                <Box>
                    <Button onClick={handleLogoutClick}>Log out</Button>
                </Box>
            )}
        </HStack>
    );
};
