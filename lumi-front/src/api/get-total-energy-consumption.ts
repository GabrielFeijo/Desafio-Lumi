import { api } from '@/lib/axios';

export interface GetTotalEnergyConsumptionResponse {
	total: number;
}

export async function getTotalEnergyConsumption() {
	const response = await api.get<GetTotalEnergyConsumptionResponse>(
		'/metrics/total-energy-consumption'
	);
	return response.data;
}
