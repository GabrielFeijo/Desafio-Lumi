'use client';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { getInvoices } from '@/api/get-invoices';
import { InvoiceTableFilters } from '@/components/invoices/invoice-table-filters';
import { InvoiceTableRow } from '@/components/invoices/invoice-table-row';
import { InvoicesTableSkeleton } from '@/components/invoices/invoices-table-skeleton';
import { Pagination } from '@/components/invoices/pagination';
import Title from '@/components/title';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const InvoicesPage = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const customerNumber = searchParams.get('customerNumber') ?? undefined;
	const referenceMonth = searchParams.get('referenceMonth') ?? undefined;

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get('page') ?? '1');

	const {
		data: result,
		isFetching: isFetching,
		isLoading: isLoading,
	} = useQuery({
		queryKey: ['invoices', customerNumber, referenceMonth, pageIndex],
		queryFn: () =>
			getInvoices({
				pageIndex,
				customerNumber,
				referenceMonth,
			}),
	});

	const handlePaginate = (pageIndex: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', (pageIndex + 1).toString());

		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className='flex  flex-1 flex-col gap-4 w-full'>
			<div className='flex items-center gap-3'>
				<Title>Faturas </Title>
				{isFetching && (
					<Loader2Icon className='size-5 animate-spin text-muted-foreground' />
				)}
			</div>
			<div className='space-y-2.5'>
				<InvoiceTableFilters />
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='w-[64px]'></TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead className='w-[140px]'>Mês</TableHead>
								<TableHead className='w-[140px]'>Valor da fatura</TableHead>
								<TableHead className='w-[170px]'>Energia Consumida</TableHead>
								<TableHead className='w-[180px]'>Energia Compensada</TableHead>
								<TableHead className='w-[132px]'></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading && !result && <InvoicesTableSkeleton />}

							{result &&
								result.invoices.map((invoice) => {
									return (
										<InvoiceTableRow
											key={invoice.id}
											invoice={invoice}
										/>
									);
								})}

							{result && result.invoices.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={7}
										className='py-10 text-center text-muted-foreground'
									>
										Nenhum resultado encontrado.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				{result && (
					<Pagination
						pageIndex={pageIndex}
						totalCount={result.meta.totalCount}
						perPage={result.meta.perPage}
						onPageChange={handlePaginate}
					/>
				)}
			</div>
		</div>
	);
};

export default InvoicesPage;
