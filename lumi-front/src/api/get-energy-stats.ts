import { api } from '@/lib/axios';

export type GetEnergyStatsResponse = Array<{
	referenceMonth: string;
	energyConsumption: number;
	energyCompensated: number;
}>;

export async function getEnergyStats(customerNumber?: string) {
	const response = await api.get<GetEnergyStatsResponse>(
		'/metrics/energy-stats',
		{
			params: {
				customerNumber: customerNumber,
			},
		}
	);

	return response.data;
}
