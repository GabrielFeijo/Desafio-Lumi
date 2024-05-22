import { api } from '@/lib/axios';

export interface GetTotalEnergyCompensatedResponse {
	total: number;
}

export async function getTotalEnergyCompensated() {
	const response = await api.get<GetTotalEnergyCompensatedResponse>(
		'/metrics/total-energy-compensated'
	);
	return response.data;
}
