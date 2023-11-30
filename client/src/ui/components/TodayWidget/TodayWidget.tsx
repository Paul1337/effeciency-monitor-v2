import { CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../domain/models/Deal/model';
import { thunkAccomplishDeal } from '../../../domain/redux/services/deal/accomplishDeal';
import { thunkDecomplishDeal } from '../../../domain/redux/services/deal/decomplishDeal';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { WeekdaysNames } from '../../shared/weekdays';
import { BaseCard } from '../BaseCard/BaseCard';
import { TodayItem } from './TodayItem';

export const TodayWidget = () => {
    const dispatch = useAppDispatch();
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);
    const todayHistory = useSelector((state: RootState) => state.history.today);
    const deals = useSelector((state: RootState) => state.deals.deals);

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
                {todayPlans.map(({ deal, weekdaysCount }, index) => (
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
                <Text>Extra deals (not in today plan):</Text>
                {otherDeals.map((deal, index) => (
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
