'use client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Newspaper } from 'lucide-react';

import { getTotalInvoices } from '@/api/get-total-invoices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CardSkeleton } from './card-skeleton';

export function InvoiceCounter() {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['metrics', 'total-invoices'],
		queryFn: getTotalInvoices,
	});

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>
					Total de faturas
				</CardTitle>
				{isLoading ? (
					<Loader2 className='size-4 animate-spin text-muted-foreground' />
				) : (
					<Newspaper className='size-4 text-muted-foreground' />
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
