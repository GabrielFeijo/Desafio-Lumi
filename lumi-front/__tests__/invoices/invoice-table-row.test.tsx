import { render } from '@testing-library/react';

import { Invoice } from '@/api/get-invoices';
import { InvoiceTableRow } from '@/components/invoices/invoice-table-row';

jest.mock('axios');

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation(jest.fn());
});

describe('InvoiceTableRow Component', () => {
	const mockInvoice: Invoice = {
		id: '12345',
		installationNumber: 123,
		totalAmount: 100.5,
		referenceMonth: 'Jan/2023',
		dueDate: '2023-01-31',
		energyQuantity: 50,
		energyAmount: 50.5,
		exemptEnergyQuantity: 25,
		exemptEnergyAmount: 25.5,
		compensatedEnergyQuantity: 30,
		compensatedEnergyAmount: 30.5,
		municipalPublicLightingContribution: 10,
		pdfUrl: 'http://example.com/invoice.pdf',
		customerId: 789,
		customer: {
			id: '67890',
			name: 'Test Customer',
		},
		createdAt: '2023-01-01T00:00:00.000Z',
		updatedAt: '2023-01-01T00:00:00.000Z',
	};

	it('should render invoice data correctly', () => {
		const { getByText } = render(<InvoiceTableRow invoice={mockInvoice} />);
		expect(getByText('Test Customer')).toBeInTheDocument();
		expect(getByText('Jan/2023')).toBeInTheDocument();
		expect(getByText('75 KWh')).toBeInTheDocument();
		expect(getByText('25 KWh')).toBeInTheDocument();
	});
});
