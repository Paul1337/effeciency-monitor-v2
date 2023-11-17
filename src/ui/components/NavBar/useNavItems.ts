import { AppRoutes } from '../../../config/router/routerConfig';

export interface INavItem {
    to: string;
    text: string;
}

export const useNavItems = (isLogged: boolean): INavItem[] => {
    return [
        {
            to: AppRoutes.Main,
            text: 'Main',
            show: isLogged,
        },
        {
            to: AppRoutes.Stat,
            text: 'Stat',
            show: isLogged,
        },
        {
            to: AppRoutes.Auth,
            text: 'Register / Login',
            show: !isLogged,
        },
    ].filter(item => item.show);
};
