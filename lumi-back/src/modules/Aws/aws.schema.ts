import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const uploadResponseSchema = z.object({
	url: z.string().url(),
});

export const { schemas: awsSchemas, $ref } = buildJsonSchemas(
	{
		uploadResponseSchema,
	},
	{
		$id: 'awsSchemas',
	}
);
