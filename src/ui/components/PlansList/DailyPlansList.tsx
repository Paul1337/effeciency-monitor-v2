import {
    Box,
    Button,
    Flex,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { IDailyPlan } from '../../../domain/entities/PlanItem/model';
import { WeekdaysNames } from '../../shared/weekdays';

export const DailyPlansList = () => {
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);

    const handleRemovePlanClick = (dailyPlan: IDailyPlan) => {
        console.log('handle remove', dailyPlan);
    };

    return (
        <TableContainer>
            <Table variant='simple'>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th>Deal</Th>
                        <Th>Weekdays</Th>
                        <Th isNumeric>Count</Th>
                        {/* <Th>1</Th> */}
                    </Tr>
                </Thead>
                <Tbody>
                    {dailyPlans.map((plan, index) => {
                        const weekDaysFormatted =
                            plan.weekdays.length <= WeekdaysNames.length / 2 ? (
                                plan.weekdays.map(weekdayInd => <span>{WeekdaysNames[weekdayInd]}</span>)
                            ) : (
                                <>
                                    <span>* {plan.weekdays.length < WeekdaysNames.length && ' / '}</span>
                                    {WeekdaysNames.filter(
                                        (weekName, index) => !plan.weekdays.includes(index)
                                    ).map(weekName => (
                                        <span>{weekName}</span>
                                    ))}
                                </>
                            );

                        return (
                            <Tr key={plan.deal.name + index}>
                                <Td>{plan.deal.name}</Td>
                                <Td>{weekDaysFormatted}</Td>
                                <Td isNumeric>{plan.count}</Td>
                                <Td display={'flex'} justifyContent={'flex-end'}>
                                    <Button onClick={() => handleRemovePlanClick(plan)}>&times;</Button>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
        // <Box display={'flex'} flexDirection={'column'}>
        //     {dailyPlans.map((dailyPlan, index) => (
        //         <Flex
        //             border='1px solid black'
        //             p={2}
        //             m={2}
        //             direction={'row'}
        //             alignItems={'center'}
        //             justifyContent={'space-between'}
        //             key={dailyPlan.deal.name + index}
        //         >
        //             <Text>{dailyPlan.deal.name}</Text>
        //             <Button onClick={() => handleRemovePlanClick(dailyPlan)}>&times;</Button>
        //         </Flex>
        //     ))}
        // </Box>
    );
};
