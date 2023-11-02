import { AppLayout } from './ui/components/AppLayout/AppLayout';
import { PlansList } from './ui/components/PlansList/PlansList';
import { TodayWidget } from './ui/components/TodayWidget/TodayWidget';

function App() {
    return (
        <AppLayout>
            <TodayWidget />
            <PlansList />
        </AppLayout>
    );
}

export default App;
