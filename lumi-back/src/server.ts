import 'dotenv/config';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import buildApp from './app';

const swaggerOptions = {
	swagger: {
		info: {
			title: 'Desafio Técnico - Gabriel Feijó',
			description: 'A REST API built with Fastify, Prisma and TypeScript',
			version: '1.0.0',
			contact: {
				name: 'Gabriel da Silva Feijó',
				url: 'https://www.linkedin.com/in/gabriel-feijo/',
				email: 'feijo6622@gmail.com',
			},
		},

		basePath: '/',
		schemes: ['http', 'https'],
		consumes: ['application/json', 'multipart/form-data'],
		produces: ['application/json'],
	},
};

const swaggerUiOptions = {
	routePrefix: 'api/docs',
	exposeRoute: true,
};

export async function main() {
	const app = await buildApp();

	app.register(fastifySwagger, swaggerOptions);
	app.register(fastifySwaggerUi, swaggerUiOptions);

	app.ready((err) => {
		if (err) throw err;
		app.swagger();
	});

	app.register(cors, { origin: true });

	try {
		const port = Number(process.env.PORT) || 3333;
		await app.listen({ port });
		console.log(`Server running on ${port}`);
	} catch (err) {
		process.exit(1);
	}
}

main();
