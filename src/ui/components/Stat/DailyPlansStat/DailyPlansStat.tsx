import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 500, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 600, pv: 2400, amt: 2400 },
];

export const DailyPlansStat = () => {
    return (
        <>
            <LineChart width={600} height={300} data={data}>
                <Line type='monotone' dataKey='uv' stroke='#8884d8' />
                <CartesianGrid stroke='#ccc' />
                <XAxis dataKey='name' />
                <YAxis />
            </LineChart>
        </>
    );
};
