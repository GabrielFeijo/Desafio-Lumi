import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

const PDFPreview = ({ pdfUrl }: { pdfUrl: string }) => {
	return (
		<DialogContent className='h-3/4 flex flex-col'>
			<DialogHeader>
				<DialogTitle>Pré-Visualizar PDF</DialogTitle>
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
