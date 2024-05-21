import { FastifyInstance } from 'fastify';
import { $ref } from './invoice.schema';
import { createInvoiceHandler, getInvoicesHandler } from './invoice.controller';

async function invoiceRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{
			schema: {
				body: $ref('createInvoiceSchema'),
				response: {
					201: $ref('singleInvoiceResponseSchema'),
				},
			},
		},
		createInvoiceHandler
	);

	app.get(
		'/',
		{
			schema: {
				response: {
					200: $ref('invoicesResponseSchema'),
				},
			},
		},
		getInvoicesHandler
	);
}

export default invoiceRoutes;
