'use client';
import { useQuery } from '@tanstack/react-query';
import { Antenna, Loader2 } from 'lucide-react';

import { getTotalEnergyConsumption } from '@/api/get-total-energy-consumption';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CardSkeleton } from './card-skeleton';

export function TotalEnergyConsumption() {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['metrics', 'total-energy-consumption'],
		queryFn: getTotalEnergyConsumption,
	});

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>
					Total consumido
				</CardTitle>
				{isLoading ? (
					<Loader2 className='size-4 animate-spin text-muted-foreground' />
				) : (
					<Antenna className='size-4 text-muted-foreground' />
				)}
			</CardHeader>
			<CardContent className='space-y-1'>
				{data ? (
					<>
						<span className='text-2xl font-bold'>{data.total}</span>

						<p className='text-xs text-muted-foreground'>
							<span className={'text-emerald-500'}>KWh</span> - (Kilowatt-hora)
						</p>
					</>
				) : (
					<CardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
