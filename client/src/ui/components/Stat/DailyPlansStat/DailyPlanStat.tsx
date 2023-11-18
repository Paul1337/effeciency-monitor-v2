import { Box, Flex, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FC, useState } from 'react';
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
import { OverallDailyPlanInfo } from './OverallDailyPlanInfo';
import { useData } from './useData';
import { DefaultChartType } from './config';
import { EChartType } from './model';

interface IDailyPlanStatProps {
    plan: IDailyPlan;
}

export const DailyPlanStat: FC<IDailyPlanStatProps> = props => {
    const { plan } = props;
    const { chartsData, info } = useData(plan);
    const [chartType, setChartType] = useState<EChartType>(DefaultChartType);

    return (
        <Box>
            <Heading mb={2}>{plan.deal.name}</Heading>
            <Flex justifyContent={'space-around'} width={'100%'} alignItems={'center'}>
                <OverallDailyPlanInfo info={info} />
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
                    <ResponsiveContainer height={300} width={'100%'}>
                        <LineChart data={chartsData[chartType]}>
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
                </Flex>
            </Flex>
        </Box>
    );
};
