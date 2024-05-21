import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const paramsSchema = z.object({
	filename: z.string(),
});

export type ParamsSchema = z.infer<typeof paramsSchema>;

export const { schemas: customerSchemas, $ref } = buildJsonSchemas({
	paramsSchema,
});
