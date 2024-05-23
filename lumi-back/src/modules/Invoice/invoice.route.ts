import { FastifyInstance } from 'fastify';
import { $ref } from './invoice.schema';
import {
	createInvoiceHandler,
	getInvoicesHandler,
	uploadFileHandler,
} from './invoice.controller';

async function invoiceRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{
			schema: {
				tags: ['Invoices'],
				summary: 'Create invoice',
				body: $ref('createInvoiceSchema'),
				response: {
					201: $ref('singleInvoiceResponseSchema'),
				},
			},
		},
		createInvoiceHandler
	);

	app.post(
		'/upload',
		{
			schema: {
				tags: ['Invoices'],
				summary: 'Extract invoice data from PDF',
				consumes: ['multipart/form-data'],
				response: {
					201: $ref('singleInvoiceResponseSchemaWithCustomer'),
				},
			},
		},
		uploadFileHandler
	);

	app.get(
		'/',
		{
			schema: {
				tags: ['Invoices'],
				summary: 'Get invoices',
				response: {
					200: $ref('invoicesResponseSchema'),
				},
				querystring: {
					type: 'object',
					properties: {
						pageIndex: { type: 'number' },
						customerNumber: { type: 'string' },
						referenceMonth: { type: 'string' },
					},
					required: ['pageIndex'],
				},
			},
		},
		getInvoicesHandler
	);
}

export default invoiceRoutes;
