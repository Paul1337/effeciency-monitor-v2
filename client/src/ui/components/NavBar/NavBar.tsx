import { Box, Button, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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
        <HStack
            m={3}
            pb={1}
            borderBottom={'1px solid'}
            justifyContent={'space-between'}
            borderColor={'gray.200'}
        >
            <HStack>
                {navItems.map((navItem, index) => (
                    <Box
                        key={getNavItemKey(navItem, index)}
                        padding={'4px'}
                        minW={100}
                        textAlign={'center'}
                    >
                        <NavLink
                            to={navItem.to}
                            style={({ isActive }) =>
                                isActive ? { color: '#007200', fontWeight: 700 } : undefined
                            }
                        >
                            {navItem.text}
                        </NavLink>
                    </Box>
                ))}
            </HStack>
            {isLogged && (
                <Box>
                    <Button onClick={handleLogoutClick}>Log out</Button>
                </Box>
            )}
        </HStack>
    );
};
