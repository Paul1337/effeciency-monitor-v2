import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { IDeal } from '../../../domain/entities/Deal/model';
import { Select } from 'chakra-react-select';
import { FormLabel, Text } from '@chakra-ui/react';

interface IDealSelectorProps {
    onSelect: (deal: IDeal) => void;
    value: IDeal;
    filter?: (deal: IDeal) => boolean;
}

const mapDealToSelectOption = (deal: IDeal) => ({ label: deal.name, value: deal.name });

export const DealSelector: FC<IDealSelectorProps> = props => {
    const { onSelect, value, filter } = props;

    const deals = useSelector((state: RootState) => state.deals.deals);
    const dealsFiltered = filter ? deals.filter(filter) : deals;

    const handleDealSelect = (e: any) => {
        const value = e.value;
        const newSelectedDeal = dealsFiltered.find(({ name }) => name === value) as IDeal;
        onSelect(newSelectedDeal);
    };

    return (
        <>
            <FormLabel>Select deal</FormLabel>
            <Select
                onChange={handleDealSelect}
                value={{ label: value.name, value: value.name }}
                options={dealsFiltered.map(mapDealToSelectOption)}
            />
        </>
    );
};
