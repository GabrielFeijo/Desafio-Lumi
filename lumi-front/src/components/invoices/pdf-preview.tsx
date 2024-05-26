import { Minus, Plus, ZoomIn, ZoomOut } from 'lucide-react';

import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { Separator } from '../ui/separator';

const PDFPreview = ({ pdfUrl }: { pdfUrl: string }) => {
	return (
		<DialogContent className='h-[90%] flex flex-1 flex-col min-w-[75%]'>
			<DialogHeader>
				<DialogTitle>Pré-Visualizar PDF</DialogTitle>
				<DialogDescription className='flex items-center gap-2'>
					<ZoomIn className='size-5' />
					<span className='flex items-center gap-1'>
						<span>Ctrl</span>
						<Plus className='size-4' />
					</span>
					<Separator
						orientation='vertical'
						className='h-6'
						asChild
					/>
					<ZoomOut className='size-5' />
					<span className='flex items-center gap-1'>
						<span>Ctrl</span>
						<Minus className='size-4' />
					</span>
				</DialogDescription>
			</DialogHeader>

			<iframe
				src={`${pdfUrl}#toolbar=0`}
				className='w-full rounded-lg border h-full'
				data-testid='pdf-preview-iframe'
			></iframe>
		</DialogContent>
	);
};

export default PDFPreview;
