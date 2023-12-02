import { useEffect, useState } from 'react';
import { longPlansApi } from '../../../../api/plans/longPlans';

export const useData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Record<string, string>>({});

    useEffect(() => {
        longPlansApi.getStat().then(res => {
            console.log('loaded long plans data', res);

            const resMapped: Record<string, string> = {};
            for (const el of res) {
                resMapped[el.deal_name] = el.done_total;
            }
            setData(resMapped);
            setIsLoading(false);
        });
    }, []);

    return {
        info: data,
        isLoading,
    };
};
