import { api } from '@/lib/axios';

export interface GetInvoiceTotalResponse {
	total: number;
	difference: number;
}

export async function getTotalInvoices() {
	const response = await api.get<GetInvoiceTotalResponse>(
		'/metrics/total-invoices'
	);

	return response.data;
}
