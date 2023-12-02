import { statConfig } from '../../../../domain/config/stat/config';
import { EChartType } from './model';

export const config = {
    lastDaysCount: statConfig.lastDays,
    crisisBorder: 0.2, // if done less than that value, counted as crisis
};

export const DefaultChartType = EChartType.DailyRelative;
