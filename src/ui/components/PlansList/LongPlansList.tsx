import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { IDailyPlan } from '../../../domain/entities/PlanItem/model';

export const DailyPlansList = () => {
    const longPlans = useSelector((state: RootState) => state.plans.longPlans);

    const handleRemovePlanClick = (dailyPlan: IDailyPlan) => {
        console.log('handle remove', dailyPlan);
    };

    return (
        <Box display={'flex'} flexDirection={'column'}>
            {longPlans.map((longPlan, index) => (
                <Flex
                    border='1px solid black'
                    p={2}
                    m={2}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    key={longPlan.deal.name + index}
                >
                    <Text>{longPlan.deal.name}</Text>
                    <Button onClick={() => handleRemovePlanClick(longPlan)}>&times;</Button>
                </Flex>
            ))}
        </Box>
    );
};
