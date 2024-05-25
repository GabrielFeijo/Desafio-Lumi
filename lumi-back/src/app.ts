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

const defaultOptions = {
	logger: false,
};

async function buildApp(options: Partial<typeof defaultOptions> = {}) {
	const app: FastifyInstance = Fastify({
		...defaultOptions,
		...options,
	});

	app.register(fastifyMultipart, {
		limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB
	});

	app.get('/', async () => {
		return { message: 'Hello World!' };
	});

	for (const schema of [
		...customerSchemas,
		...invoiceSchemas,
		...awsSchemas,
		...metricsSchemas,
	]) {
		app.addSchema(schema);
	}

	app.register(metricRoutes, { prefix: 'api/metrics' });
	app.register(customerRoutes, { prefix: 'api/customers' });
	app.register(invoiceRoutes, { prefix: 'api/invoices' });
	app.register(awsRoutes, { prefix: 'api/s3' });

	return app;
}

export default buildApp;
