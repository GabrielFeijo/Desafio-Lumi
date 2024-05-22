import { api } from '@/lib/axios';

export interface GetCustomerTotalResponse {
	total: number;
	difference: number;
}

export async function getTotalCustomers() {
	const response = await api.get<GetCustomerTotalResponse>(
		'/metrics/total-customers'
	);
	return response.data;
}
