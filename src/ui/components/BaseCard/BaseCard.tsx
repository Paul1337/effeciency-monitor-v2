import { Card, CardProps } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

export const BaseCard: FC<CardProps> = props => {
    const { children, ...otherProps } = props;
    return (
        <Card {...otherProps} m={1} borderWidth={2} borderColor={'gray.300'} flex={1}>
            {children}
        </Card>
    );
};
