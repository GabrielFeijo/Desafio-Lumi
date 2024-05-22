import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const getEnergyRequest = z.object({
	customerNumber: z.bigint().optional(),
});

export type EnergyRequest = z.infer<typeof getEnergyRequest>;

export const { schemas: metricsSchemas, $ref } = buildJsonSchemas(
	{
		getEnergyRequest,
	},
	{
		$id: 'metricsSchemas',
	}
);
