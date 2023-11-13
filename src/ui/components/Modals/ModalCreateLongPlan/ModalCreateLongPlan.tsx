import { FC, useEffect, useState } from 'react';
import { BasicModal } from '../Modal/Modal';
import { FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';
import { RootState, useAppDispatch } from '../../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../../domain/entities/Deal/model';
import { DealSelector } from '../../DealSelector/DealSelector';
import { thunkCreateDeal } from '../../../../domain/redux/services/deal/createDeal';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { thunkCreateLongPlan } from '../../../../domain/redux/services/plan/createPlan/createLongPlan';
import { stringifyDate } from '../../../../domain/shared/dates/stringifyDate';
import { AppDealSelector } from '../../DealSelector/AppDealSelector';

interface IModalCreateLongPlanProps {
    isOpen: boolean;
    onClose?: () => void;
}

const config = {
    defaultPlanCount: 1,
};

export const ModalCreateLongPlan: FC<IModalCreateLongPlanProps> = (props) => {
    const dispatch = useAppDispatch();
    const { isOpen, onClose } = props;

    const [planCount, setPlanCount] = useState(config.defaultPlanCount);
    const [dealName, setDealName] = useState('');
    const [date, setDate] = useState(new Date());

    const handleAction = () => {
        if (!dealName) return;
        dispatch(
            thunkCreateLongPlan({
                count: planCount,
                dealName,
                date: stringifyDate(date),
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
            title='Creating long plan'
        >
            <SingleDatepicker date={date} onDateChange={setDate} />
            <FormLabel>Plan count:</FormLabel>
            <Input
                type='number'
                onChange={(e) => setPlanCount(Number(e.target.value))}
                value={planCount.toString()}
            />
            <AppDealSelector plansKey='longPlans' onSelect={setDealName} />
        </BasicModal>
    );
};
