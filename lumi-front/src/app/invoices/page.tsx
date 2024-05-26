'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon, Upload } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { getInvoices } from '@/api/get-invoices';
import { InvoiceTableFilters } from '@/components/invoices/invoice-table-filters';
import { InvoiceTableRow } from '@/components/invoices/invoice-table-row';
import { InvoicesTableSkeleton } from '@/components/invoices/invoices-table-skeleton';
import { Pagination } from '@/components/invoices/pagination';
import { UploadDialog } from '@/components/invoices/upload-dialog';
import Title from '@/components/title';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import useQueryString from '@/hooks/use-query-string';

const InvoicesPage = () => {
	const { setQueryString } = useQueryString();

	const searchParams = useSearchParams();

	const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

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
		setQueryString('page', (pageIndex + 1).toString());
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
				<div className='flex justify-between flex-wrap'>
					<InvoiceTableFilters />
					<Dialog onOpenChange={setIsUploadDialogOpen}>
						<DialogTrigger asChild>
							<Button
								className='space-x-2'
								variant='outline'
								size='default'
							>
								<Upload className='size-3' />
								<span>Enviar nova fatura</span>
							</Button>
						</DialogTrigger>

						{isUploadDialogOpen && <UploadDialog />}
					</Dialog>
				</div>
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
