import { FC, useEffect, useState } from 'react';
import { BasicModal } from '../Modal/Modal';
import { FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';
import { RootState, useAppDispatch } from '../../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../../domain/entities/Deal/model';
import { DealSelector } from '../../DealSelector/DealSelector';
import { WeekdaysSelector } from '../../WeekdaysSelector/WeekdaysSelector';
import { thunkCreateDeal } from '../../../../domain/redux/services/deal/createDeal';
import { thunkCreateDailyPlan } from '../../../../domain/redux/services/plan/createPlan/createDailyPlan';

interface IModalCreateDailyPlanProps {
    isOpen: boolean;
    onClose?: () => void;
}

const config = {
    defaultPlanCount: 1,
};

const AllWeekdays = [0, 1, 2, 3, 4, 5, 6];

export const ModalCreateDailyPlan: FC<IModalCreateDailyPlanProps> = props => {
    const dispatch = useAppDispatch();
    const { isOpen, onClose } = props;

    const [planCount, setPlanCount] = useState(config.defaultPlanCount);
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | null>(deals[0]);

    const [isCreatingNewDeal, setCreatingNewDeal] = useState(false);
    const [dealTextName, setDealTextName] = useState('');
    const [weekdays, setWeekdays] = useState(AllWeekdays);

    useEffect(() => {
        setCreatingNewDeal(!Boolean(deals[0]));
        setDeal(deals[0]);
    }, [deals]);

    const handleAction = () => {
        if (!deal && !dealTextName) return;
        if (isCreatingNewDeal) {
            dispatch(thunkCreateDeal(dealTextName));
        }
        dispatch(
            thunkCreateDailyPlan({
                count: planCount,
                dealName: isCreatingNewDeal ? dealTextName : (deal as IDeal).name,
                weekdays,
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
            <WeekdaysSelector value={weekdays} onChange={value => setWeekdays(value)} />
            <FormLabel>Plan count:</FormLabel>
            <Input
                type='number'
                onChange={e => setPlanCount(Number(e.target.value))}
                value={planCount.toString()}
            />
            <FormControl display={'flex'} my={2} alignItems={'center'}>
                <FormLabel margin={0} mr={2}>
                    Create new deal:
                </FormLabel>
                <Switch
                    id='new-old-deal'
                    size={'md'}
                    isChecked={isCreatingNewDeal}
                    onChange={e => setCreatingNewDeal(e.target.checked)}
                />
            </FormControl>
            {isCreatingNewDeal || !deal ? (
                <>
                    <FormLabel>Choose deal name</FormLabel>
                    <Input
                        type='text'
                        value={dealTextName}
                        onChange={e => setDealTextName(e.target.value)}
                    />
                </>
            ) : (
                <DealSelector onSelect={deal => setDeal(deal)} value={deal} />
            )}
        </BasicModal>
    );
};
