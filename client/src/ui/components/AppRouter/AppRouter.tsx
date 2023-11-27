import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/Main/Main';
import { StatPage } from '../../pages/Stat/Stat';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { AppRoutes } from '../../../config/router/routerConfig';
import { AuthenticationPage } from '../../pages/AuthenticationPage/AuthenticationPage';

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<AuthenticationPage />} path={AppRoutes.Auth} />
            <Route element={<PrivateRoute />} path='/'>
                <Route element={<MainPage />} path={AppRoutes.Main} />
                <Route element={<StatPage />} path={AppRoutes.Stat} />
            </Route>
        </Routes>
    );
};
