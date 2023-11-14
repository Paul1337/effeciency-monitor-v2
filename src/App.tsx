import { AppLayout } from './ui/components/AppLayout/AppLayout';
import { AppRouter } from './ui/components/AppRouter/AppRouter';
import { NavBar } from './ui/components/NavBar/NavBar';

function App() {
    return (
        <AppLayout>
            <NavBar />
            <AppRouter />
        </AppLayout>
    );
}

export default App;
