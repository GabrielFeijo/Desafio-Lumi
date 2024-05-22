import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const uploadResponseSchema = z.object({
	url: z.string().url(),
});

const paramsSchema = z.object({
	filename: z.string(),
});

export type ParamsSchema = z.infer<typeof paramsSchema>;

export const { schemas: awsSchemas, $ref } = buildJsonSchemas(
	{
		uploadResponseSchema,
		paramsSchema,
	},
	{
		$id: 'awsSchemas',
	}
);
