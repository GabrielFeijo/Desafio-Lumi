import { Loader2, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CardSkeleton } from './card-skeleton';

export function CustomerCounter() {
	const isLoading = false;

	const data = 10;

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
						<span className='text-2xl font-bold'>{data}</span>
					</>
				) : (
					<CardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
