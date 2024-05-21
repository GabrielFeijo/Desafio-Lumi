import fastify from 'fastify';
import cors from '@fastify/cors';
import { customerSchemas } from './modules/Customer/customer.schema';
import customerRoutes from './modules/Customer/customer.route';
import invoiceRoutes from './modules/Invoice/invoice.route';
import { invoiceSchemas } from './modules/Invoice/invoice.schema';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyMultipart from '@fastify/multipart';

export const app = fastify();

app.register(cors, { origin: true });
app.register(fastifyMultipart);

app.get('/', async () => {
	return { message: 'Hello World!' };
});

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

		host: '0.0.0.0:3000',
		basePath: '/',
		schemes: ['http', 'https'],
		consumes: ['application/json'],
		produces: ['application/json'],
	},
};

const swaggerUiOptions = {
	routePrefix: '/docs',
	exposeRoute: true,
};

async function main() {
	for (const schema of [...customerSchemas, ...invoiceSchemas]) {
		app.addSchema(schema);
	}

	app.register(fastifySwagger, swaggerOptions);
	app.register(fastifySwaggerUi, swaggerUiOptions);

	app.ready((err) => {
		if (err) throw err;
		app.swagger();
	});

	app.register(customerRoutes, { prefix: 'api/customers' });
	app.register(invoiceRoutes, { prefix: 'api/invoices' });

	try {
		await app.listen({ port: 3333 });
		console.log(`Server running on 3333`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

main();
