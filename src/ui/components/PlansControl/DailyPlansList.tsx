import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { IDailyPlan } from '../../../domain/entities/PlanItem/model';
import { WeekdaysNames } from '../../shared/weekdays';
import { thunkRemoveDailyPlan } from '../../../domain/redux/services/plan/removePlan';

export const DailyPlansList = () => {
    const dispatch = useAppDispatch();
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);

    const handleRemovePlanClick = (dailyPlan: IDailyPlan) => {
        dispatch(thunkRemoveDailyPlan(dailyPlan));
    };

    return (
        <TableContainer flex={1}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Deal</Th>
                        <Th>Weekdays</Th>
                        <Th isNumeric>Count</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {dailyPlans.map((plan, index) => {
                        const weekDaysFormatted =
                            plan.weekdays.length <= WeekdaysNames.length / 2 ? (
                                plan.weekdays.map(weekdayInd => (
                                    <span key={WeekdaysNames[weekdayInd]}>
                                        {WeekdaysNames[weekdayInd]}{' '}
                                    </span>
                                ))
                            ) : (
                                <>
                                    <span>* {plan.weekdays.length < WeekdaysNames.length && ' / '}</span>
                                    {WeekdaysNames.filter(
                                        (weekName, index) => !plan.weekdays.includes(index)
                                    ).map(weekName => (
                                        <span key={weekName}>{weekName} </span>
                                    ))}
                                </>
                            );

                        return (
                            <Tr key={plan.id ?? plan.deal.name + index}>
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
    );
};
