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

interface IModalCreateLongPlanProps {
    isOpen: boolean;
    onClose?: () => void;
}

const config = {
    defaultPlanCount: 1,
};

export const ModalCreateLongPlan: FC<IModalCreateLongPlanProps> = props => {
    const dispatch = useAppDispatch();
    const { isOpen, onClose } = props;

    const longPlans = useSelector((state: RootState) => state.plans.longPlans);
    const [planCount, setPlanCount] = useState(config.defaultPlanCount);
    const allDeals = useSelector((state: RootState) => state.deals.deals);
    const deals = allDeals.filter(deal => !longPlans.some(plan => plan.deal.name === deal.name));
    const [deal, setDeal] = useState<IDeal | null>(deals[0]);

    const [isCreatingNewDeal, setCreatingNewDeal] = useState(false);
    const [dealTextName, setDealTextName] = useState('');
    const [date, setDate] = useState(new Date());

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
            thunkCreateLongPlan({
                count: planCount,
                dealName: isCreatingNewDeal ? dealTextName : (deal as IDeal).name,
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
                    onChange={e => deals.length > 0 && setCreatingNewDeal(e.target.checked)}
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
