import { useState } from 'react';
import axios from 'axios';
import { ArrowDownToLine, Loader2, Search } from 'lucide-react';

import { Invoice } from '@/api/get-invoices';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { capitalizeWords } from '@/utils/capitalize-words';

import PDFPreview from './pdf-preview';

export const InvoiceTableRow = ({ invoice }: { invoice: Invoice }) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const handleDownload = (pdfUrl: string, name: string) => {
		axios({
			url: pdfUrl,
			method: 'GET',
			responseType: 'blob',
		}).then((response) => {
			const link = document.createElement('a');
			link.setAttribute('download', `${name}.pdf`);
			const href = URL.createObjectURL(response.data);
			link.href = href;
			link.setAttribute('target', '_blank');
			link.click();
			URL.revokeObjectURL(href);
		});
	};

	return (
		<TableRow>
			<TableCell>
				<Dialog
					onOpenChange={setIsPreviewOpen}
					open={isPreviewOpen}
				>
					<DialogTrigger asChild>
						<Button
							variant='outline'
							size='default'
						>
							<Search className='size-3' />
							<span className='sr-only'>Ver fatura</span>
						</Button>
					</DialogTrigger>

					{isPreviewOpen && <PDFPreview pdfUrl={invoice.pdfUrl} />}
				</Dialog>
			</TableCell>

			<TableCell className='font-medium w-48'>
				{capitalizeWords(invoice.customer.name)}
			</TableCell>
			<TableCell className='font-medium'>{invoice.referenceMonth}</TableCell>
			<TableCell className='font-medium'>
				{invoice.totalAmount.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
			<TableCell className='font-medium'>
				{invoice.energyQuantity + invoice.exemptEnergyQuantity} KWh
			</TableCell>
			<TableCell className='font-medium'>
				{invoice.exemptEnergyQuantity} KWh
			</TableCell>

			<TableCell>
				<Button
					variant='outline'
					size='default'
					onClick={() => {
						handleDownload(invoice.pdfUrl, invoice.referenceMonth);
					}}
				>
					Baixar
					<ArrowDownToLine className='ml-2 size-3' />
				</Button>
			</TableCell>
		</TableRow>
	);
};
