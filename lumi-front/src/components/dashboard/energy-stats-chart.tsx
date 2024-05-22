'use client';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { Loader2, XCircle } from 'lucide-react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { emerald, red } from 'tailwindcss/colors';

import { getEnergyStats } from '@/api/get-energy-stats';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { CustomLegend } from './chart/custom-legend';
import { CustomTooltip } from './chart/custom-tooltip';

export const EnergyStatsChart = () => {
	const [period, setPeriod] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	});

	const {
		data: energyStatsData,
		isFetching: isLoadingEnergyStats,
		error: energyStatsError,
	} = useQuery({
		retry: false,
		queryKey: ['metrics', 'energy-stats', period],
		queryFn: getEnergyStats,
	});

	function handleResetPeriod() {
		setPeriod({
			from: subDays(new Date(), 7),
			to: new Date(),
		});
	}

	return (
		<Card className='col-span-6'>
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
				<div className='flex items-center gap-3'>
					<Label>Cliente</Label>
				</div>
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
							<div className='flex h-[240px] w-full flex-col items-center justify-center gap-0.5'>
								<span className='text-sm text-muted-foreground'>
									Nenhum resultado encontrado para o cliente escolhido.
								</span>
								<Button
									variant='link'
									size='default'
									className='text-violet-500 dark:text-violet-400'
									onClick={handleResetPeriod}
								>
									Exibir resultados todos os clientes
								</Button>
							</div>
						)}
					</>
				) : energyStatsError ? (
					<div className='flex h-[240px] w-full flex-col items-center justify-center gap-0.5'>
						<span className='flex items-center gap-2 text-sm text-red-500 dark:text-red-400'>
							<XCircle className='h-4 w-4' />
							Erro ao obter dados do cliente.
						</span>
						<Button
							variant='link'
							size='default'
							className='text-violet-500 dark:text-violet-400'
							onClick={handleResetPeriod}
						>
							Recarregar gráfico
						</Button>
					</div>
				) : (
					<div className='flex h-[240px] w-full items-center justify-center'>
						<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
					</div>
				)}
			</CardContent>
		</Card>
	);
};
