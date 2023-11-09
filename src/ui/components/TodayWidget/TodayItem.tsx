import { Box, Button, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { IDeal } from '../../../domain/entities/Deal/model';

interface ITodayItemProps {
    deal: IDeal;
    done: number;
    count?: number;
    onDo?: () => void;
    onUndo?: () => void;
    canUndo?: boolean;
}

export const TodayItem: FC<ITodayItemProps> = props => {
    const { deal, done, count, onDo, onUndo, canUndo = false } = props;

    const handleDoClick = () => onDo?.();
    const handleUndoClick = () => onUndo?.();

    const percentage = count && ((done / count) * 100).toFixed(1);
    return (
        <Box
            borderWidth={1}
            borderColor={'gray.300'}
            p={2}
            m={4}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Text fontSize={20} fontWeight={'bold'}>
                {deal.name}
            </Text>

            <Box display={'flex'} alignItems={'center'}>
                <Box
                    marginRight={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    minWidth={150}
                    fontSize={20}
                    fontWeight={700}
                >
                    <Box>
                        <Text display={'inline'}>{done}</Text>
                        {count && <Text display={'inline'}> / {count}</Text>}
                    </Box>
                    {count && (
                        <>
                            <Text
                                display={'inline-block'}
                                ml={4}
                                fontSize={22}
                                color={done >= count ? 'green.800' : 'yellow.800'}
                            >
                                {percentage}%
                            </Text>
                        </>
                    )}
                </Box>

                <Button onClick={handleDoClick}>Do</Button>

                <Button isDisabled={!canUndo} onClick={handleUndoClick} marginLeft={3}>
                    Undo
                </Button>
            </Box>
        </Box>
    );
};
