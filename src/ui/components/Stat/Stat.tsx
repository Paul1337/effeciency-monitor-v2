import {
    CardBody,
    CardHeader,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { BaseCard } from '../BaseCard/BaseCard';
import { DailyPlansStat } from './DailyPlansStat/DailyPlansStat';
import { LongPlansStat } from './LongPlansStat/LongPlansStat';
import { DealsStat } from './DealsStat/DealsStat';

export const Stat = () => {
    return (
        <BaseCard>
            <CardHeader>
                <Heading>Stat</Heading>
            </CardHeader>
            <CardBody>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab>Daily plans</Tab>
                        <Tab>Long plans</Tab>
                        <Tab>Deals</Tab>
                    </TabList>
                    <TabPanels overflow={'auto'}>
                        <TabPanel>
                            <DailyPlansStat />
                        </TabPanel>
                        <TabPanel>
                            <LongPlansStat />
                        </TabPanel>
                        <TabPanel>
                            <DealsStat />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </CardBody>
        </BaseCard>
    );
};
