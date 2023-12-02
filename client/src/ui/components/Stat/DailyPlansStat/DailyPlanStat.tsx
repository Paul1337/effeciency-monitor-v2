import { Box, Flex, Heading, Radio, RadioGroup, Spinner, Stack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { IDailyPlan } from '../../../../domain/models/PlanItem/model';
import { DefaultChartType } from './config';
import { EChartType, IData } from './model';
import { loadData } from './loadData';

interface IDailyPlanStatProps {
    plan: IDailyPlan;
}

export const DailyPlanStat: FC<IDailyPlanStatProps> = props => {
    const [data, setData] = useState<IData | null>(null);
    const [chartType, setChartType] = useState<EChartType>(DefaultChartType);

    const { plan } = props;

    useEffect(() => {
        loadData(plan, chartType).then(res => {
            console.log('loaded daily plan data', res);
            setData(res);
        });
    }, [chartType]);

    return (
        <Box>
            <Heading mb={2}>{plan.deal.name}</Heading>
            <Flex justifyContent={'space-around'} width={'100%'} alignItems={'center'}>
                {/* <OverallDailyPlanInfo info={info} /> */}
                <Flex direction={'column'} flex={1}>
                    <RadioGroup
                        colorScheme='green'
                        onChange={type => setChartType(type as EChartType)}
                        value={chartType}
                    >
                        <Stack direction='row' justifyContent={'center'}>
                            <Radio value={EChartType.DailyRelative}>Daily relative</Radio>
                            <Radio value={EChartType.Accumulation}>Accumulation</Radio>
                            <Radio value={EChartType.AccumulationRelative}>Accumulation relative</Radio>
                        </Stack>
                    </RadioGroup>
                    {data?.chartsData ? (
                        <ResponsiveContainer height={300} width={'100%'}>
                            <LineChart data={data?.chartsData}>
                                <CartesianGrid stroke='#ccc' />
                                <XAxis dataKey={'name'} />
                                <YAxis dataKey={'value'} />
                                <Legend />
                                <Tooltip />
                                <ReferenceLine
                                    y={100}
                                    label='efficient'
                                    stroke='green'
                                    strokeDasharray='3 3'
                                />
                                <Line type='monotone' dataKey='value' stroke='#8884d8' />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <Spinner
                            margin={'5px auto'}
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='green.500'
                            size='xl'
                        />
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};
