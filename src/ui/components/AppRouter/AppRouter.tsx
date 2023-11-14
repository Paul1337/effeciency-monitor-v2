import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/Main/Main';
import { StatPage } from '../../pages/Stat/Stat';

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainPage />} path='/' />
            <Route element={<StatPage />} path='/stat' />
        </Routes>
    );
};
