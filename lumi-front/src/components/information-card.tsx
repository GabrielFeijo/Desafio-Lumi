import { DollarSign, Loader2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CardSkeleton } from './card-skeleton';

export function InformationCard() {
	const isLoading = false;

	const data = 10;

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>
					Faturamento total (mês)
				</CardTitle>
				{isLoading ? (
					<Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
				) : (
					<DollarSign className='h-4 w-4 text-muted-foreground' />
				)}
			</CardHeader>
			<CardContent className='space-y-1'>
				{data ? (
					<>
						<span className='text-2xl font-bold'>
							{data.toLocaleString('pt-BR', {
								currency: 'BRL',
								style: 'currency',
							})}
						</span>
					</>
				) : (
					<CardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
