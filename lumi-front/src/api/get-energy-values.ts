import { api } from '@/lib/axios';

export type GetEnergyValuesResponse = Array<{
	referenceMonth: string;
	consumedEnergyValue: number;
	compensatedEnergyValue: number;
}>;

export async function getEnergyValues(customerNumber?: string) {
	const response = await api.get<GetEnergyValuesResponse>(
		'/metrics/energy-values',
		{
			params: {
				customerNumber: customerNumber,
			},
		}
	);

	return response.data;
}
