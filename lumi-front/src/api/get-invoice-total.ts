import { api } from '@/lib/axios';

export interface GetInvoiceTotalResponse {
	total: number;
	difference: number;
}

export async function getInvoiceTotal() {
	const response = await api.get<GetInvoiceTotalResponse>(
		'/metrics/invoice-total'
	);
	console.log(response);

	return response.data;
}
