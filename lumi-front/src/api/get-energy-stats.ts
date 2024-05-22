import { api } from '@/lib/axios';

export type getEnergyStatsResponse = Array<{
	referenceMonth: string;
	energyConsumption: number;
	energyCompensated: number;
}>;

export async function getEnergyStats() {
	const response = await api.get<getEnergyStatsResponse>(
		'/metrics/energy-stats'
	);

	console.log(response.data);

	return response.data;
}
