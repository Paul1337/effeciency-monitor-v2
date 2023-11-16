import React, { FC, useEffect, useState } from 'react';
import { DealSelector } from './DealSelector';
import { FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { IDeal } from '../../../domain/entities/Deal/model';

interface IDailyDealSelectorProps {
    onSelect: (dealName: string) => void;
    plansKey?: keyof RootState['plans'];
}

export const AppDealSelector: FC<IDailyDealSelectorProps> = props => {
    const { onSelect, plansKey = 'dailyPlans' } = props;

    const allDeals = useSelector((state: RootState) => state.deals.deals);
    const dailyPlans = useSelector((state: RootState) => state.plans[plansKey]);
    const deals = allDeals.filter(deal => !dailyPlans.some(plan => plan.deal.name === deal.name));

    const [dealTextName, setDealTextName] = useState('');
    const [deal, setDeal] = useState<IDeal | null>(deals[0]);
    const [isCreatingNewDeal, setCreatingNewDeal] = useState(false);

    useEffect(() => {
        setCreatingNewDeal(!Boolean(deals[0]));
        setDeal(deals[0]);
    }, [allDeals]);

    useEffect(() => {
        if (deal) {
            onSelect(deal?.name);
        }
    }, [deal]);

    useEffect(() => {
        if (dealTextName) {
            onSelect(dealTextName);
        }
    }, [dealTextName]);

    return (
        <>
            <FormControl display={'flex'} my={2} alignItems={'center'}>
                <FormLabel margin={0} mr={2}>
                    Create new deal:
                </FormLabel>
                <Switch
                    id='new-old-deal'
                    size={'md'}
                    colorScheme='green'
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
                <DealSelector onSelect={setDeal} value={deal} dealsOptions={deals} />
            )}
        </>
    );
};
