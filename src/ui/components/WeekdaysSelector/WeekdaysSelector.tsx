import { FormLabel, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { WeekdaysNames } from '../../shared/weekdays';

const WeekdaysSelectOptions = WeekdaysNames.map(day => ({ label: day, value: day }));

interface IWeekdaysSelectorProps {
    value: Array<number>;
    onChange: (value: Array<number>) => void;
}

export const WeekdaysSelector: FC<IWeekdaysSelectorProps> = props => {
    const { value, onChange } = props;

    return (
        <>
            <FormLabel>Weekdays</FormLabel>
            <Select
                value={WeekdaysSelectOptions.filter((_, ind) => value.includes(ind))}
                isMulti={true}
                onChange={selectedWeekdays =>
                    onChange(selectedWeekdays.map(w => WeekdaysNames.indexOf(w.value)))
                }
                options={WeekdaysSelectOptions}
            />
        </>
    );
};
