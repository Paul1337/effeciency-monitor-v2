import { FC } from 'react';
import { IDeal } from '../../../domain/entities/Deal/model';
import { Select } from 'chakra-react-select';
import { FormLabel, Text } from '@chakra-ui/react';

interface IDealSelectorProps {
    onSelect: (deal: IDeal) => void;
    value: IDeal;
    dealsOptions: IDeal[];
}

const mapDealToSelectOption = (deal: IDeal) => ({ label: deal.name, value: deal.name });

export const DealSelector: FC<IDealSelectorProps> = props => {
    const { onSelect, value, dealsOptions } = props;

    const handleDealSelect = (e: any) => {
        const newSelectedDeal = dealsOptions.find(deal => deal.name === e.value) as IDeal;
        onSelect(newSelectedDeal);
    };

    return (
        <>
            <FormLabel>Select deal</FormLabel>
            <Select
                selectedOptionColorScheme='green'
                // colorScheme='green'
                onChange={handleDealSelect}
                value={{ label: value.name, value: value.name }}
                options={dealsOptions.map(mapDealToSelectOption)}
            />
        </>
    );
};
