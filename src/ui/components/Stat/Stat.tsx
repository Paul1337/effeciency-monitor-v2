import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { DailyPlansStat } from './DailyPlansStat/DailyPlansStat';
import { LongPlansStat } from './LongPlansStat/LongPlansStat';

export const Stat = () => {
    return (
        <Tabs
            variant='soft-rounded'
            colorScheme='green'
            flex={1}
            overflow={'hidden'}
            display={'flex'}
            flexDirection={'column'}
        >
            <TabList
                justifyContent={'center'}
                mb={2}
                p={2}
                // background={'gray.50'}
                // borderBottom={'1px solid'}
                // borderColor={'blackAlpha.100'}
            >
                <Tab transitionDuration={'.35s'}>Daily plans</Tab>
                <Tab transitionDuration={'.35s'}>Long plans</Tab>
            </TabList>
            <TabPanels overflow={'auto'} flex={1}>
                <TabPanel>
                    <DailyPlansStat />
                </TabPanel>
                <TabPanel>
                    <LongPlansStat />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
