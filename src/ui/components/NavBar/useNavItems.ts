export interface INavItem {
    to: string;
    text: string;
}

export const useNavItems = (isLogged: boolean): INavItem[] => {
    return [
        {
            to: '/',
            text: 'Main',
            show: isLogged,
        },
        {
            to: '/stat',
            text: 'Stat',
            show: isLogged,
        },
        {
            to: '/reg_log',
            text: 'Register & Login',
            show: !isLogged,
        },
        {
            to: '/logout',
            text: 'Log out',
            show: isLogged,
        },
    ].filter((item) => item.show);
};
