import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import awsRoutes from './modules/Aws/aws.route';
import customerRoutes from './modules/Customer/customer.route';
import invoiceRoutes from './modules/Invoice/invoice.route';
import metricRoutes from './modules/Metrics/metrics.route';
import fastifyMultipart from '@fastify/multipart';
import { awsSchemas } from './modules/Aws/aws.schema';
import { customerSchemas } from './modules/Customer/customer.schema';
import { invoiceSchemas } from './modules/Invoice/invoice.schema';
import { metricsSchemas } from './modules/Metrics/metrics.schema';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import { getFaviconBuffer } from './utils/get-favicon-buffer';
import { getLogoBuffer } from './utils/get-logo-buffer';

const defaultOptions = {
	logger: false,
};

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

const swaggerUiOptions: FastifySwaggerUiOptions = {
	routePrefix: 'api/docs',
	logo: {
		type: 'image/png',
		content: Buffer.from(getLogoBuffer(), 'base64'),
	},
	theme: {
		title: 'Documentação - Desafio Técnico',
		favicon: [
			{
				filename: 'favicon.png',
				rel: 'icon',
				sizes: '16x16',
				type: 'image/png',
				content: Buffer.from(getFaviconBuffer(), 'base64'),
			},
		],
	},
};

async function buildApp(options: Partial<typeof defaultOptions> = {}) {
	const app: FastifyInstance = Fastify({
		...defaultOptions,
		...options,
	});

	for (const schema of [
		...customerSchemas,
		...invoiceSchemas,
		...awsSchemas,
		...metricsSchemas,
	]) {
		app.addSchema(schema);
	}

	app.register(fastifyMultipart, {
		limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB
	});

	app.get('/', async () => {
		return { message: 'Hello World!' };
	});

	app.register(cors, { origin: true });

	app.register(fastifySwagger, swaggerOptions);
	app.register(fastifySwaggerUi, swaggerUiOptions);

	app.ready((err) => {
		if (err) throw err;
		app.swagger();
	});

	app.register(metricRoutes, { prefix: 'api/metrics' });
	app.register(customerRoutes, { prefix: 'api/customers' });
	app.register(invoiceRoutes, { prefix: 'api/invoices' });
	app.register(awsRoutes, { prefix: 'api/s3' });

	return app;
}

export default buildApp;
