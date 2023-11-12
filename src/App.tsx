import { Box, HStack } from '@chakra-ui/react';
import { AppLayout } from './ui/components/AppLayout/AppLayout';
import { PlansControl } from './ui/components/PlansControl/PlansControl';
import { Stat } from './ui/components/Stat/Stat';
import { TodayWidget } from './ui/components/TodayWidget/TodayWidget';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './ui/pages/Main/Main';
import { StatPage } from './ui/pages/Stat/Stat';
import { NavBar } from './ui/components/NavBar/NavBar';

function App() {
    return (
        <AppLayout>
            <NavBar />
            <Routes>
                <Route element={<MainPage />} path='/' />
                <Route element={<StatPage />} path='/stat' />
            </Routes>
        </AppLayout>
    );
}

export default App;
