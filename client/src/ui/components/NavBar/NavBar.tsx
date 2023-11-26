import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkLogout } from '../../../domain/redux/services/auth/logOut';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { INavItem, useNavItems } from './useNavItems';

const getNavItemKey = (navLink: INavItem, index: number) => navLink.text + navLink.to + index;

export const NavBar = () => {
    const isLogged = useSelector((state: RootState) => state.user.isLogged);
    const userData = useSelector((state: RootState) => state.user.userData);
    const navItems = useNavItems(isLogged);
    const dispatch = useAppDispatch();

    const handleLogoutClick = () => {
        dispatch(thunkLogout());
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
                <Flex alignItems={'center'}>
                    <Text fontWeight={700}>{userData?.email}</Text>
                    <Button ml={4} onClick={handleLogoutClick}>
                        Log out
                    </Button>
                </Flex>
            )}
        </HStack>
    );
};
