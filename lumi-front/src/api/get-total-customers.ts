import { api } from '@/lib/axios';

export interface GetTotalCustomersResponse {
	total: number;
	difference: number;
}

export async function getTotalCustomers() {
	const response = await api.get<GetTotalCustomersResponse>(
		'/metrics/total-customers'
	);
	return response.data;
}
