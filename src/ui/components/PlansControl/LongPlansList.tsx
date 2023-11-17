import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { IPlanItem } from '../../../domain/models/PlanItem/model';
import { thunkRemoveLongPlan } from '../../../domain/redux/services/plan/removePlan';

export const LongPlansList = () => {
    const dispatch = useAppDispatch();
    const longPlans = useSelector((state: RootState) => state.plans.longPlans);

    const handleRemovePlanClick = (longPlan: IPlanItem) => {
        dispatch(thunkRemoveLongPlan(longPlan));
    };

    return (
        <TableContainer overflowY={'auto'}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Deal</Th>
                        <Th>Plan date</Th>
                        <Th isNumeric>Count</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {longPlans.map((plan, index) => {
                        return (
                            <Tr key={plan.id ?? plan.deal.name + index}>
                                <Td>{plan.deal.name}</Td>
                                <Td>{plan.date}</Td>
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
