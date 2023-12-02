import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { InfoTable } from '../../InfoTable/InfoTable';
import { useData } from './useData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../domain/redux/store';

export const LongPlansStat = () => {
    const longsPlans = useSelector((state: RootState) => state.plans.longPlans);
    const { isLoading, info } = useData();

    return longsPlans.length === 0 ? (
        <Text>No long plans</Text>
    ) : (
        <Flex justifyContent={'space-around'}>
            {isLoading ? (
                <Spinner
                    margin={'5px auto'}
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='green.500'
                    size='xl'
                />
            ) : (
                <Box flex={0.7}>
                    <InfoTable title={'Overall long-term plans'} info={info} />
                </Box>
            )}
        </Flex>
    );
};
