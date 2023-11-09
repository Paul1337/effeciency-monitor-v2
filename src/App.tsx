import { Box, HStack } from '@chakra-ui/react';
import { AppLayout } from './ui/components/AppLayout/AppLayout';
import { PlansControl } from './ui/components/PlansControl/PlansControl';
import { Stat } from './ui/components/Stat/Stat';
import { TodayWidget } from './ui/components/TodayWidget/TodayWidget';

function App() {
    return (
        <AppLayout>
            <HStack spacing={0} alignItems={'stretch'} height={600}>
                <TodayWidget />
                <PlansControl />
            </HStack>
            <Stat />
        </AppLayout>
    );
}

export default App;
