import { FastifyInstance } from 'fastify';
import { getInvoiceTotal } from './metrics.service';

async function metricRoutes(app: FastifyInstance) {
	app.get(
		'/invoice-total',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get invoice total',
			},
		},
		getInvoiceTotal
	);
}

export default metricRoutes;
