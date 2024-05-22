import { FastifyInstance } from 'fastify';
import {
	getTotalCustomersHandler,
	getTotalInvoicesHandler,
} from './metrics.controller';

async function metricRoutes(app: FastifyInstance) {
	app.get(
		'/total-invoices',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get total number of invoices.',
			},
		},
		getTotalInvoicesHandler
	);

	app.get(
		'/total-customers',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get total number of customers.',
			},
		},
		getTotalCustomersHandler
	);
}

export default metricRoutes;
