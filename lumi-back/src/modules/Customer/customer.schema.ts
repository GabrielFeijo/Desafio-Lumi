import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const customerCore = {
	customerNumber: z.bigint({
		required_error: 'customerNumber is required',
		invalid_type_error: 'customerNumber must be a bigint',
	}),
	name: z.string({
		required_error: 'name is required',
		invalid_type_error: 'name must be a string',
	}),
};

const createCustomerSchema = z.object({
	...customerCore,
});

const singleCustomerResponseSchema = z.object({
	id: z.string().cuid(),
	...customerCore,
	createdAt: z.string(),
	updatedAt: z.string(),
});

const paramsSchema = z.object({
	id: z.string(),
});

export type ParamsSchema = z.infer<typeof paramsSchema>;

const customersResponseSchema = z.array(singleCustomerResponseSchema);

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export const { schemas: customerSchemas, $ref } = buildJsonSchemas({
	createCustomerSchema,
	singleCustomerResponseSchema,
	customersResponseSchema,
	paramsSchema,
});
