import { HStack } from '@chakra-ui/react';
import { AppLayout } from '../../../ui/components/AppLayout/AppLayout';
import { PlansControl } from '../../../ui/components/PlansControl/PlansControl';
import { TodayWidget } from '../../../ui/components/TodayWidget/TodayWidget';

export const MainPage = () => {
    return (
        <HStack spacing={0} alignItems={'stretch'} height={600}>
            <TodayWidget />
            <PlansControl />
        </HStack>
    );
};
