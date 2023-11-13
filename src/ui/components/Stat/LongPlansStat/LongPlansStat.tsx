import React from 'react';
import { InfoTable } from '../../InfoTable/InfoTable';
import { useData } from './useData';

export const LongPlansStat = () => {
    const info = useData();

    return <InfoTable title={'Overall long-term plans'} info={info} />;
};
