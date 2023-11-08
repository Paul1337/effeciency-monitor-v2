import React, { FC, useEffect, useState } from 'react';
import { BasicModal } from '../Modal/Modal';
import { FormLabel, Input, Text, useDisclosure } from '@chakra-ui/react';
import { RootState, useAppDispatch } from '../../../../domain/redux/store';
import { thunkCreateDailyPlan } from '../../../../domain/redux/services/plan/createPlan';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../../domain/entities/Deal/model';
import { DealSelector } from '../../DealSelector/DealSelector';
import { WeekdaysSelector } from '../../WeekdaysSelector/WeekdaysSelector';

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

    const [planCount, setPlanCount] = useState(config.defaultPlanCount);
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | null>(deals[0]);

    const [isCreatingNewDeal, setCreatingNewDeal] = useState(false);
    const [dealTextName, setDealTextName] = useState('');

    useEffect(() => {
        if (!deal) setCreatingNewDeal(true);
    }, [deal]);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleAction = () => {
        if (!deal) return;
        dispatch(
            thunkCreateDailyPlan({
                count: planCount,
                deal,
                weekdays: [],
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
            <WeekdaysSelector />
            <FormLabel>Plan count:</FormLabel>
            <Input
                type='number'
                onChange={(e) => setPlanCount(Number(e.target.value))}
                value={planCount.toString()}
            />
            {isCreatingNewDeal && (
                <>
                    <FormLabel>Deal name</FormLabel>
                    <Input
                        type='text'
                        value={dealTextName}
                        onChange={(e) => setDealTextName(e.target.value)}
                    />
                </>
            )}
            {deal && <DealSelector onSelect={(deal) => setDeal(deal)} value={deal} />}
        </BasicModal>
    );
};
