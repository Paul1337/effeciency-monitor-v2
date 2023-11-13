import React, { FC } from 'react';
import { Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { EInfoItems } from './useData';

interface IOverallDailyPlanInfoProps {
    info: Record<EInfoItems, string>;
}

const InfoItemToTextMap: Record<EInfoItems, string> = {
    [EInfoItems.crisis]: 'Crisis',
    [EInfoItems.success]: 'Success',
    [EInfoItems.crisisCount]: 'Crisis count',
};

export const OverallDailyPlanInfo: FC<IOverallDailyPlanInfoProps> = props => {
    const { info } = props;

    return (
        <TableContainer m={2}>
            <Table variant='simple' width={'150px'} border={'1px solid'} borderColor={'gray.300'}>
                <TableCaption>Overall daily</TableCaption>
                <Tbody>
                    {Object.entries(info).map(([label, value]) => (
                        <Tr key={label + value}>
                            <Td>{InfoItemToTextMap[Number(label) as EInfoItems]}</Td>
                            <Td>{value}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
