'use client';
import { z } from 'zod';

export const envSchema = z.object({
	NEXT_PUBLIC_NODE_ENV: z.enum(['production', 'development', 'test']),
	NEXT_PUBLIC_API_URL: z.string(),
});

export const env = envSchema.parse({
	NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
