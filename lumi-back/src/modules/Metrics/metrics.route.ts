import { FastifyInstance } from 'fastify';
import {
	getTotalCustomersHandler,
	getTotalEnergyCompensatedHandler,
	getTotalEnergyConsumptionHandler,
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

	app.get(
		'/total-energy-consumption',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get total energy consumption.',
			},
		},
		getTotalEnergyConsumptionHandler
	);

	app.get(
		'/total-energy-compensated',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get total energy compensated.',
			},
		},
		getTotalEnergyCompensatedHandler
	);
}

export default metricRoutes;
