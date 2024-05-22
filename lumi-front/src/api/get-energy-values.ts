import { api } from '@/lib/axios';

export type getEnergyStatsResponse = Array<{
	referenceMonth: string;
	consumedEnergyValue: number;
	compensatedEnergyValue: number;
}>;

export async function getEnergyValues() {
	const response = await api.get<getEnergyStatsResponse>(
		'/metrics/energy-values'
	);

	return response.data;
}
