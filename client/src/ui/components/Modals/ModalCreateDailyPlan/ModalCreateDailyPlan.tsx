import { FC, useEffect, useState } from 'react';
import { BasicModal } from '../Modal/Modal';
import { FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { useAppDispatch } from '../../../../domain/redux/store';
import { thunkCreateDailyPlan } from '../../../../domain/redux/services/plan/createPlan/createDailyPlan';
import { WeekdaysCountSelector } from '../../WeekdaysCountSelector/WeekdaysCountSelector';
import { TWeekdaysCount } from '../../../../domain/models/PlanItem/model';
import { WeekdaysNames } from '../../../shared/weekdays';
import { AppDealSelector } from '../../DealSelector/AppDealSelector';
import { useDailyPlanValidation } from '../../../../domain/hooks/validation/useDailyPlanValidation';

interface IModalCreateDailyPlanProps {
    isOpen: boolean;
    onClose?: () => void;
}

const config = {
    defaultPlanCount: 1,
};

export const ModalCreateDailyPlan: FC<IModalCreateDailyPlanProps> = props => {
    const dispatch = useAppDispatch();
    const { isOpen, onClose } = props;

    const [dailyCount, setDailyCount] = useState(config.defaultPlanCount);
    const [weekdaysCount, setWeekdaysCount] = useState(
        WeekdaysNames.map(w => config.defaultPlanCount) as TWeekdaysCount
    );

    const [dealName, setDealName] = useState('');

    const { isValid, error: notValidReason } = useDailyPlanValidation(dealName, weekdaysCount);
    useEffect(() => {
        const newValue = new Array(weekdaysCount.length).fill(dailyCount) as TWeekdaysCount;
        setWeekdaysCount(newValue);
    }, [dailyCount]);

    const handleAction = () => {
        if (!isValid) return;
        dispatch(
            thunkCreateDailyPlan({
                dealName,
                weekdaysCount,
            })
        );
        onClose?.();
    };

    return (
        <BasicModal
            action='Create'
            isOpen={isOpen}
            onClose={onClose}
            onAction={handleAction}
            title='Creating daily plan'
        >
            <FormControl>
                <FormLabel>Daily plan count:</FormLabel>
                <Input
                    type='number'
                    onChange={e => setDailyCount(Number(e.target.value))}
                    value={dailyCount.toString()}
                />
                <WeekdaysCountSelector value={weekdaysCount} onChange={val => setWeekdaysCount(val)} />
                <AppDealSelector onSelect={setDealName} plansKey='dailyPlans' />
                {!isValid && (
                    <Text mt={1} color={'red'}>
                        Not valid: {notValidReason}
                    </Text>
                )}
            </FormControl>
        </BasicModal>
    );
};
