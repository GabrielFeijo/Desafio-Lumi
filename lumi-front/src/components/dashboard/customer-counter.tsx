'use client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Users } from 'lucide-react';

import { getTotalCustomers } from '@/api/get-total-customers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CardSkeleton } from './card-skeleton';

export function CustomerCounter() {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['metrics', 'total-customers'],
		queryFn: getTotalCustomers,
	});

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 gap-2'>
				<CardTitle className='text-base font-semibold'>
					Total de clientes
				</CardTitle>
				{isLoading ? (
					<Loader2 className='size-4 animate-spin text-muted-foreground' />
				) : (
					<Users className='size-4 text-muted-foreground' />
				)}
			</CardHeader>
			<CardContent className='space-y-1'>
				{data ? (
					<>
						<span className='text-2xl font-bold'>{data.total}</span>

						<p className='text-xs text-muted-foreground'>
							<span
								className={`${
									data.difference > 0 ? 'text-emerald-500' : 'text-red-500'
								}`}
							>
								{data.difference > 0 ? `+${data.difference}` : data.difference}
							</span>{' '}
							em relação ao mês passado
						</p>
					</>
				) : (
					<CardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
