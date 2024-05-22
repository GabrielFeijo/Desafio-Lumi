import axios from 'axios';

import { env } from './env';

console.log(env.NEXT_PUBLIC_API_URL);

export const api = axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
});
