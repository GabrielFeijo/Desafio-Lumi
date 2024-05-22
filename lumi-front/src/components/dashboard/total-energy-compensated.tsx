'use client';
import { useQuery } from '@tanstack/react-query';
import { Leaf, Loader2 } from 'lucide-react';

import { getTotalEnergyCompensated } from '@/api/get-total-energy-compensated';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CardSkeleton } from './card-skeleton';

export function TotalEnergyCompensated() {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['metrics', 'total-energy-compensated'],
		queryFn: getTotalEnergyCompensated,
	});

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>
					Energia compensada
				</CardTitle>
				{isLoading ? (
					<Loader2 className='size-4 animate-spin text-muted-foreground' />
				) : (
					<Leaf className='size-4 text-muted-foreground' />
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
