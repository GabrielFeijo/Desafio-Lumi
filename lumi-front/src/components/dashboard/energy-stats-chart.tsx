'use client';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
	CartesianGrid,
	Legend,
	LegendProps,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts';
import { emerald, red } from 'tailwindcss/colors';

import { getEnergyStats } from '@/api/get-energy-stats';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { defaultSelectOption } from '@/constants/default-select-option';
import useQueryString from '@/hooks/use-query-string';
import { TurnOffDefaultPropsWarning } from '@/utils/turn-off-default-warning';

import ChartSelect from './chart/chart-select';
import Loader from './chart/loader';
import NoResult from './chart/no-result';

const CustomLegend = (props: LegendProps) => {
	const { payload } = props;
	if (payload && payload.length) {
		return (
			<div className='flex justify-center'>
				{payload?.map((entry, index) => (
					<div
						key={`item-${index}`}
						className='flex items-center mx-2'
					>
						<div
							style={{
								backgroundColor: entry.color,
								width: 10,
								height: 10,
								borderRadius: '50%',
								marginRight: 5,
							}}
						></div>
						<span>
							{entry.value === 'energyConsumption'
								? 'Energia Consumida'
								: 'Energia Compensada'}
						</span>
					</div>
				))}
			</div>
		);
	}

	return null;
};

const CustomTooltip = ({
	active,
	payload,
	label,
}: TooltipProps<number, number>) => {
	if (active && payload && payload.length) {
		return (
			<div className='flex flex-col gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm items-center'>
				<span className='font-semibold'>Mês: {label}</span>
				{payload.map((item) => (
					<div key={item.name}>
						<span className='font-semibold'>
							{item.dataKey === 'energyConsumption'
								? 'Consumido'
								: 'Compensado'}
						</span>
						<span> | </span>
						<span className='font-semibold'>{item.value} Kwh</span>
					</div>
				))}
			</div>
		);
	}

	return null;
};

export const EnergyStatsChart = () => {
	const { setQueryString } = useQueryString();
	const searchParams = useSearchParams()!;

	const selectedCustomer =
		searchParams.get('sCustomer') || defaultSelectOption.value;

	const {
		data: energyStatsData,
		isFetching: isLoadingEnergyStats,
		error: energyStatsError,
	} = useQuery({
		retry: false,
		queryKey: ['metrics', 'energy-stats', selectedCustomer],
		queryFn: () =>
			getEnergyStats(
				selectedCustomer !== defaultSelectOption.value
					? selectedCustomer
					: undefined
			),
	});

	const handleResetCustomer = () => {
		setQueryString('sCustomer', defaultSelectOption.value);
	};

	const handleChange = (value: string) => {
		setQueryString('sCustomer', value);
	};

	return (
		<Card className='col-span-6'>
			<TurnOffDefaultPropsWarning />
			<CardHeader className='flex flex-row items-center justify-between pb-8'>
				<div className='space-y-1'>
					<CardTitle className='flex items-center gap-2 text-base font-medium'>
						Energia Consumida
						{isLoadingEnergyStats && (
							<Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
						)}
					</CardTitle>
					<CardDescription>
						<span className={'text-emerald-500'}>Kwh</span> - (Kilowatt-hora)
					</CardDescription>
				</div>
				<ChartSelect
					handleChange={handleChange}
					value={selectedCustomer}
				/>
			</CardHeader>
			<CardContent>
				{energyStatsData ? (
					<>
						{energyStatsData.length > 0 ? (
							<ResponsiveContainer
								width='100%'
								height={240}
							>
								<LineChart
									data={energyStatsData}
									style={{ fontSize: 12 }}
								>
									<XAxis
										dataKey='referenceMonth'
										stroke='#888888'
										tickLine={false}
										axisLine={false}
										dy={16}
									/>

									<YAxis
										stroke='#888888'
										tickLine={false}
										axisLine={false}
										width={40}
									/>

									<CartesianGrid
										className='!stroke-muted'
										vertical={false}
									/>

									<Line
										type='linear'
										strokeWidth={2}
										dataKey='energyConsumption'
										stroke={red['500']}
									/>
									<Line
										type='linear'
										strokeWidth={2}
										dataKey='energyCompensated'
										stroke={emerald['500']}
									/>

									<Legend
										verticalAlign='top'
										align='center'
										content={<CustomLegend />}
									/>

									<Tooltip
										cursor={false}
										content={<CustomTooltip />}
									/>
								</LineChart>
							</ResponsiveContainer>
						) : (
							<NoResult
								text='Nenhum dado encontrado.'
								onClick={handleResetCustomer}
							/>
						)}
					</>
				) : energyStatsError ? (
					<NoResult
						text='Ocorreu um erro ao buscar os dados.'
						onClick={handleResetCustomer}
					/>
				) : (
					<Loader />
				)}
			</CardContent>
		</Card>
	);
};
