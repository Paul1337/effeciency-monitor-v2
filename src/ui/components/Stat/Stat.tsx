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
import React from 'react';
import { BaseCard } from '../BaseCard/BaseCard';

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
                    <TabPanels>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                    </TabPanels>
                </Tabs>
            </CardBody>
        </BaseCard>
    );
};
