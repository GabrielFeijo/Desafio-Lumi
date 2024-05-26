import { FastifyInstance } from 'fastify';
import {
	getEnergyStatsHandler,
	getEnergyValuesHandler,
	getTotalCustomersHandler,
	getTotalEnergyCompensatedHandler,
	getTotalEnergyConsumptionHandler,
	getTotalInvoicesHandler,
} from './metrics.controller';
import { $ref } from './metrics.schema';

async function metricRoutes(app: FastifyInstance) {
	app.get(
		'/total-invoices',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get total number of invoices.',
				response: {
					200: $ref('energyMetricsResponseSchema'),
				},
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
				response: {
					200: $ref('energyMetricsResponseSchema'),
				},
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
				response: {
					200: $ref('totalQuantityResponseSchema'),
				},
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
				response: {
					200: $ref('totalQuantityResponseSchema'),
				},
			},
		},
		getTotalEnergyCompensatedHandler
	);

	app.get(
		'/energy-stats',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get energy stats.',
				querystring: {
					type: 'object',
					properties: {
						customerNumber: { type: 'string' },
					},
					required: [],
				},
				response: {
					200: $ref('monthlyEnergyMetricsArraySchema'),
				},
			},
		},
		getEnergyStatsHandler
	);

	app.get(
		'/energy-values',
		{
			schema: {
				tags: ['Metrics'],
				summary: 'Get energy values.',
				querystring: {
					type: 'object',
					properties: {
						customerNumber: { type: 'string' },
					},
					required: [],
				},
				response: {
					200: $ref('monthlyEnergyValuesArraySchema'),
				},
			},
		},
		getEnergyValuesHandler
	);
}

export default metricRoutes;
