import { api } from '@/lib/axios';

export type GetCustomersResponse = Array<{
	id: string;
	customerNumber: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}>;

export async function getCustomers() {
	const response = await api.get<GetCustomersResponse>('/customers');

	return response.data;
}
