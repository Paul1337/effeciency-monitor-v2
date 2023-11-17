import { Box, Flex, Text } from '@chakra-ui/react';
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
    const { info, chartData } = useData();

    return longsPlans.length === 0 ? (
        <Text>No long plans</Text>
    ) : (
        <Flex justifyContent={'space-around'}>
            <Box flex={0.7}>
                <InfoTable title={'Overall long-term plans'} info={info} />
            </Box>
            <ResponsiveContainer height={300} style={{ flex: 1 }}>
                <BarChart width={730} height={250} data={chartData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend margin={{ top: 25 }} /> */}
                    <Bar dataKey='percentValue' fill='#32a852a0' />
                </BarChart>
            </ResponsiveContainer>
        </Flex>
    );
};
