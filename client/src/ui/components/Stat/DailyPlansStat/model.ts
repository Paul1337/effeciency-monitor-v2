export interface IChartItem {
    name: string;
    value: number;
}

export enum EInfoItems {
    success,
    crisis,
    crisisCount,
}

export enum EChartType {
    DailyRelative = 'daily-relative',
    Accumulation = 'accumulation',
    AccumulationRelative = 'accumulation-relative',
}

export interface IData {
    chartsData: Array<IChartItem>;
}
