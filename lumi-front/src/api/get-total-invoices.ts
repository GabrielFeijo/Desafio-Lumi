import { api } from '@/lib/axios';

export interface GetTotalInvoicesResponse {
	total: number;
	difference: number;
}

export async function getTotalInvoices() {
	const response = await api.get<GetTotalInvoicesResponse>(
		'/metrics/total-invoices'
	);

	return response.data;
}
