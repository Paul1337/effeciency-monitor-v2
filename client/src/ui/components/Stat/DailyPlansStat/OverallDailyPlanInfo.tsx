import { FC } from 'react';
import { InfoTable } from '../../InfoTable/InfoTable';
import { EInfoItems } from './model';

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

    const convertedInfo: Record<string, string> = {};
    Object.entries(info).forEach(([key, value]) => {
        const newKey = InfoItemToTextMap[Number(key) as EInfoItems];
        convertedInfo[newKey] = value;
    });

    return <InfoTable title={'Overall daily'} info={convertedInfo} m={2} />;
};
