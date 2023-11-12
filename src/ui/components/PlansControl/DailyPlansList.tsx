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
        <TableContainer>
            <Table variant='simple' size={'sm'}>
                <Thead>
                    <Tr>
                        <Th>Deal</Th>
                        {WeekdaysNames.map(wd => (
                            <Th key={wd} isNumeric>
                                {wd.substring(0, 3)}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {dailyPlans.map((plan, index) => (
                        <Tr key={plan.id ?? plan.deal.name + index}>
                            <Td>{plan.deal.name}</Td>
                            {plan.weekdaysCount.map((wdCount, ind) => (
                                <Td key={wdCount.toString() + ind} textAlign={'center'}>
                                    {wdCount}
                                </Td>
                            ))}
                            <Td display={'flex'} justifyContent={'flex-end'}>
                                <Button onClick={() => handleRemovePlanClick(plan)}>&times;</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
