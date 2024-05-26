import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const getEnergyRequest = z.object({
	customerNumber: z.bigint().optional(),
});

const totalQuantityResponseSchema = z.object({
	total: z.number(),
});

const energyMetricsResponseSchema = z.object({
	total: z.number(),
	difference: z.number(),
});

const monthlyEnergyMetricsSchema = z.object({
	referenceMonth: z.string(),
	energyConsumption: z.number(),
	energyCompensated: z.number(),
});

const monthlyEnergyMetricsArraySchema = z.array(monthlyEnergyMetricsSchema);

const monthlyEnergyValuesSchema = z.object({
	referenceMonth: z.string(),
	consumedEnergyValue: z.number(),
	compensatedEnergyValue: z.number(),
});

const monthlyEnergyValuesArraySchema = z.array(monthlyEnergyValuesSchema);

export type EnergyRequest = z.infer<typeof getEnergyRequest>;

export const { schemas: metricsSchemas, $ref } = buildJsonSchemas(
	{
		getEnergyRequest,
		monthlyEnergyMetricsSchema,
		monthlyEnergyMetricsArraySchema,
		monthlyEnergyValuesSchema,
		monthlyEnergyValuesArraySchema,
		totalQuantityResponseSchema,
		energyMetricsResponseSchema,
	},
	{
		$id: 'metricsSchemas',
	}
);
