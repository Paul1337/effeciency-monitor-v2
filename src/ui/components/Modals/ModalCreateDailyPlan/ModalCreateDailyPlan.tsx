import { FC, useState } from 'react';
import { BasicModal } from '../Modal/Modal';
import { FormLabel } from '@chakra-ui/react';
import { useAppDispatch } from '../../../../domain/redux/store';
import { thunkCreateDailyPlan } from '../../../../domain/redux/services/plan/createPlan/createDailyPlan';
import { WeekdaysCountSelector } from '../../WeekdaysCountSelector/WeekdaysCountSelector';
import { TWeekdaysCount } from '../../../../domain/entities/PlanItem/model';
import { WeekdaysNames } from '../../../shared/weekdays';
import { AppDealSelector } from '../../DealSelector/AppDealSelector';

interface IModalCreateDailyPlanProps {
    isOpen: boolean;
    onClose?: () => void;
}

const config = {
    defaultPlanCount: 1,
};

export const ModalCreateDailyPlan: FC<IModalCreateDailyPlanProps> = (props) => {
    const dispatch = useAppDispatch();
    const { isOpen, onClose } = props;

    const [weekdaysCount, setWeekdaysCount] = useState(
        WeekdaysNames.map((w) => config.defaultPlanCount) as TWeekdaysCount
    );

    const [dealName, setDealName] = useState('');

    const handleAction = () => {
        if (!dealName) return;
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
            <FormLabel>Plan count:</FormLabel>
            {/* <Input
                type='number'
                onChange={e => setPlanCount(Number(e.target.value))}
                value={planCount.toString()}
            /> */}
            <WeekdaysCountSelector value={weekdaysCount} onChange={(val) => setWeekdaysCount(val)} />
            <AppDealSelector onSelect={setDealName} plansKey='dailyPlans' />
        </BasicModal>
    );
};
