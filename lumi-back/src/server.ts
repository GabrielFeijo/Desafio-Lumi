import fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors';

export const app = fastify();

app.register(routes, { prefix: '/api/v1' });
app.register(cors, { origin: true });

app.listen({ port: 3333 }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`Server running on ${address}`);
});
