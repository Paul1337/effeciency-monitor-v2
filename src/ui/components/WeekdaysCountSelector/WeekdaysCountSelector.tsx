import React, { FC } from 'react';
import { TWeekdaysCount } from '../../../domain/entities/PlanItem/model';
import { Box, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { WeekdaysNames } from '../../shared/weekdays';

interface IWeekdaysCountSelectorProps {
    value: TWeekdaysCount;
    onChange: (value: TWeekdaysCount) => void;
}

const AllWeekdays = [0, 1, 2, 3, 4, 5, 6];

export const WeekdaysCountSelector: FC<IWeekdaysCountSelectorProps> = props => {
    const { value, onChange } = props;

    const handleWeekdayCountChange = (weekDay: number, newValue: number) => {
        const updatedValue = [...value] as TWeekdaysCount;
        updatedValue[weekDay] = newValue;
        onChange(updatedValue);
    };

    return (
        <Flex dir='row' flexWrap={'wrap'} justifyContent={'space-around'} alignItems={'center'}>
            {AllWeekdays.map(weekDay => (
                <FormControl w={'auto'} key={weekDay}>
                    <FormLabel textAlign={'center'}>{WeekdaysNames[weekDay]}</FormLabel>
                    <Input
                        type='number'
                        value={value[weekDay].toString()}
                        onChange={e => handleWeekdayCountChange(weekDay, Number(e.target.value))}
                    />
                </FormControl>
            ))}
        </Flex>
    );
};
