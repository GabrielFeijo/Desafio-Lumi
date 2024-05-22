import { z } from 'zod';

export const envSchema = z.object({
	NEXT_PUBLIC_MODE: z.enum(['production', 'development', 'test']),
	NEXT_PUBLIC_API_URL: z.string(),
});

export const env = envSchema.parse(process.env);
