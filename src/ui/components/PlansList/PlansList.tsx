import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { IDailyPlan } from '../../../domain/entities/PlanItem/model';
import { DailyPlansList } from './DailyPlansList';

export const PlansList = () => {
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);

    const handleRemovePlanClick = (dailyPlan: IDailyPlan) => {
        console.log('handle remove', dailyPlan);
    };

    return (
        <Card>
            <CardHeader>
                <Heading>Plans</Heading>
            </CardHeader>
            <CardBody>
                <Tabs>
                    <TabList>
                        <Tab>Daily</Tab>
                        <Tab>Long-time</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DailyPlansList />
                        </TabPanel>
                        <TabPanel></TabPanel>
                    </TabPanels>
                </Tabs>
            </CardBody>
        </Card>
    );
};
