import fastify from 'fastify';
import cors from '@fastify/cors';

export const app = fastify();

app.register(cors, { origin: true });

app.get('/', async () => {
	return { message: 'Hello World!' };
});

async function main() {
	try {
		await app.listen({ port: 3333 });
		console.log(`Server running on 3333`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

main();
