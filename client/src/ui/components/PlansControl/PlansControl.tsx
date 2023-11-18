import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Spacer,
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
import { ModalCreateLongPlan } from '../Modals/ModalCreateLongPlan/ModalCreateLongPlan';
import { BaseCard } from '../BaseCard/BaseCard';

export const PlansControl = () => {
    const [showModalCreateDailyPlan, setShowModalCreateDailyPlan] = useState(false);
    const [showModalCreateLongPlan, setShowModalCreateLongPlan] = useState(false);

    const handleCreateDailyPlanClick = () => setShowModalCreateDailyPlan(true);
    const handleCreateLongPlanClick = () => setShowModalCreateLongPlan(true);

    return (
        <>
            <Tabs flex={1} display={'flex'} colorScheme='green'>
                <BaseCard flex={1}>
                    <CardHeader>
                        <Heading>Plans</Heading>
                        <TabList mt={2}>
                            <Tab>Daily</Tab>
                            <Tab>Long-time</Tab>
                        </TabList>
                    </CardHeader>
                    <CardBody overflowY={'auto'} width={'750px'}>
                        <TabPanels>
                            <TabPanel>
                                <DailyPlansList />
                            </TabPanel>
                            <TabPanel>
                                <LongPlansList />
                            </TabPanel>
                        </TabPanels>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup gap={2} colorScheme='green'>
                            <Button mt={4} onClick={handleCreateDailyPlanClick}>
                                Create daily plan
                            </Button>
                            <Button mt={4} onClick={handleCreateLongPlanClick}>
                                Create long plan
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </BaseCard>
            </Tabs>
            <ModalCreateDailyPlan
                isOpen={showModalCreateDailyPlan}
                onClose={() => setShowModalCreateDailyPlan(false)}
            />
            <ModalCreateLongPlan
                isOpen={showModalCreateLongPlan}
                onClose={() => setShowModalCreateLongPlan(false)}
            />
        </>
    );
};
