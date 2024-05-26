import { render, screen, waitFor } from '@testing-library/react';

import PDFPreview from '@/components/invoices/pdf-preview';
import { Dialog } from '@/components/ui/dialog';

describe('PDFPreview Component', () => {
	const pdfUrl = 'https://example.com/sample.pdf';

	it('renders PDFPreview component with correct title', () => {
		render(
			<Dialog open>
				<PDFPreview pdfUrl={pdfUrl} />
			</Dialog>
		);

		const titleElement = screen.getByRole('heading', {
			name: 'Pré-Visualizar PDF',
		});
		expect(titleElement).toBeInTheDocument();
	});

	it('renders PDF iframe with correct source', async () => {
		render(
			<Dialog open>
				<PDFPreview pdfUrl={pdfUrl} />
			</Dialog>
		);

		await waitFor(() => {
			const iframeElement = screen.getByTestId('pdf-preview-iframe');
			expect(iframeElement).toBeInTheDocument();
			expect(iframeElement).toHaveAttribute('src', `${pdfUrl}#toolbar=0`);
		});
	});

	it('renders PDF iframe with correct styles', async () => {
		render(
			<Dialog open>
				<PDFPreview pdfUrl={pdfUrl} />
			</Dialog>
		);

		await waitFor(() => {
			const iframeElement = screen.getByTestId('pdf-preview-iframe');
			expect(iframeElement).toBeInTheDocument();
			expect(iframeElement).toHaveClass('w-full rounded-lg border h-full');
		});
	});
});
