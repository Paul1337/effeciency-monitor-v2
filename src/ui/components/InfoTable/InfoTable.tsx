import {
    Table,
    TableCaption,
    TableContainer,
    TableContainerProps,
    Tbody,
    Td,
    Tr,
} from '@chakra-ui/react';
import { FC } from 'react';

interface IInfoTableProps extends TableContainerProps {
    info: Record<string, string>;
    title: string;
}

export const InfoTable: FC<IInfoTableProps> = props => {
    const { info, title, ...otherProps } = props;

    return (
        <TableContainer {...otherProps}>
            <Table variant='simple' borderColor={'gray.300'}>
                <TableCaption>{title}</TableCaption>
                <Tbody>
                    {Object.entries(info).map(([label, value]) => (
                        <Tr key={label + value}>
                            <Td>{label}</Td>
                            <Td>{value}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
