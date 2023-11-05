import { FormLabel, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useState } from 'react';
import { WeekdaysNames } from '../../shared/weekdays';

const WeekdaysSelectOptions = WeekdaysNames.map(day => ({ label: day, value: day }));

export const WeekdaysSelector = () => {
    const [weekdays, setWeekdays] = useState<Array<number>>([0, 1, 2, 3, 4, 5, 6]);
    return (
        <>
            <FormLabel>Weekdays</FormLabel>
            <Select
                defaultValue={WeekdaysSelectOptions}
                isMulti={true}
                onChange={selectedWeekdays =>
                    setWeekdays(selectedWeekdays.map(w => WeekdaysNames.indexOf(w.value)))
                }
                options={WeekdaysSelectOptions}
            />
        </>
    );
};
