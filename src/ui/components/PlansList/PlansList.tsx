import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { DailyPlansList } from './DailyPlansList';
import { LongPlansList } from './LongPlansList';
import { ModalCreateDailyPlan } from '../Modals/ModalCreateDailyPlan/ModalCreateDailyPlan';
import { useState } from 'react';

export const PlansList = () => {
    const [showModalCreateDailyPlan, setShowModalCreateDailyPlan] = useState(false);

    const handleCreateDailyPlanClick = () => {
        setShowModalCreateDailyPlan(true);
    };
    const handleCreateLongPlanClick = () => {};

    return (
        <>
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
                                <Button mt={4} onClick={handleCreateDailyPlanClick}>
                                    Create daily plan
                                </Button>
                            </TabPanel>
                            <TabPanel>
                                <LongPlansList />
                                <Button mt={4} onClick={handleCreateLongPlanClick}>
                                    Create long plan
                                </Button>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
            <ModalCreateDailyPlan
                isOpen={showModalCreateDailyPlan}
                onClose={() => setShowModalCreateDailyPlan(false)}
            />
        </>
    );
};
