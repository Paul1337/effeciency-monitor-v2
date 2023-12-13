import {
    Box,
    CardBody,
    CardHeader,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../domain/models/Deal/model';
import { thunkAccomplishDeal } from '../../../domain/redux/services/deal/accomplishDeal';
import { thunkDecomplishDeal } from '../../../domain/redux/services/deal/decomplishDeal';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { WeekdaysNames } from '../../shared/weekdays';
import { BaseCard } from '../BaseCard/BaseCard';
import { TodayItem } from './TodayItem';
import { useState } from 'react';

export const TodayWidget = () => {
    const dispatch = useAppDispatch();
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);
    const todayHistory = useSelector((state: RootState) => state.history.today);
    const deals = useSelector((state: RootState) => state.deals.deals);

    const [todayDealsFilter, setTodayDealsFilter] = useState('');

    const currentDate = new Date();
    const currentWeekday = (currentDate.getDay() + 6) % 7;
    const todayPlans = dailyPlans.filter(dailyPlan => dailyPlan.weekdaysCount[currentWeekday] > 0);

    const otherDeals = deals.filter(deal => !todayPlans.some(plan => plan.deal.name === deal.name));

    const handleTodayItemDo = (deal: IDeal) => {
        dispatch(
            thunkAccomplishDeal({
                deal: deal,
            })
        );
    };

    const handleTodayItemUndo = (deal: IDeal) => {
        dispatch(
            thunkDecomplishDeal({
                deal: deal,
            })
        );
    };

    return (
        <BaseCard minWidth={550}>
            <CardHeader>
                <Heading>Today ({WeekdaysNames[currentWeekday]})</Heading>
            </CardHeader>
            <CardBody overflowY={'auto'}>
                <Text>Planned deals:</Text>
                <FormControl mt={2} display={'flex'} alignItems={'center'}>
                    <FormLabel>Filter: </FormLabel>
                    <Input
                        type='text'
                        value={todayDealsFilter}
                        onChange={e => setTodayDealsFilter(e.target.value)}
                    />
                </FormControl>
                <Box overflowY={'auto'} flex={1}>
                    {todayPlans
                        .filter(pl =>
                            pl.deal.name.toLowerCase().includes(todayDealsFilter.toLocaleLowerCase())
                        )
                        .map(({ deal, weekdaysCount }, index) => (
                            <TodayItem
                                onDo={() => handleTodayItemDo(deal)}
                                onUndo={() => handleTodayItemUndo(deal)}
                                deal={deal}
                                count={weekdaysCount[currentWeekday]}
                                done={todayHistory?.done[deal.name] ?? 0}
                                key={deal.name + index}
                                canUndo={(todayHistory?.done[deal.name] ?? 0) > 0}
                            />
                        ))}
                </Box>
                <Text>Extra deals (not in today plan):</Text>
                {otherDeals
                    .filter(deal =>
                        deal.name.toLowerCase().includes(todayDealsFilter.toLocaleLowerCase())
                    )
                    .map((deal, index) => (
                        <TodayItem
                            key={deal.name + index}
                            deal={deal}
                            done={todayHistory?.done[deal.name] ?? 0}
                            onDo={() => handleTodayItemDo(deal)}
                            onUndo={() => handleTodayItemUndo(deal)}
                            canUndo={(todayHistory?.done[deal.name] ?? 0) > 0}
                        />
                    ))}
            </CardBody>
        </BaseCard>
    );
};
