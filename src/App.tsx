import { AppLayout } from './ui/components/AppLayout/AppLayout';
import { PlansControl } from './ui/components/PlansControl/PlansControl';
import { TodayWidget } from './ui/components/TodayWidget/TodayWidget';

function App() {
    return (
        <AppLayout>
            <TodayWidget />
            <PlansControl />
        </AppLayout>
    );
}

export default App;
