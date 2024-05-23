import { FastifyInstance } from 'fastify';
import { $ref } from './customer.schema';
import {
	deleteCustomerHandler,
	getCustomersHandler,
	registerCustomerHandler,
} from './customer.controller';

async function customerRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{
			schema: {
				tags: ['Customers'],
				summary: 'Register customer',
				body: $ref('createCustomerSchema'),
				response: {
					201: $ref('singleCustomerResponseSchema'),
				},
			},
		},
		registerCustomerHandler
	);

	app.get(
		'/',
		{
			schema: {
				tags: ['Customers'],
				summary: 'Get customers',
				response: {
					200: $ref('customersResponseSchema'),
				},
			},
		},
		getCustomersHandler
	);

	app.delete(
		'/:id',
		{
			schema: {
				tags: ['Customers'],
				summary: 'Delete customer by id.',
				response: {
					200: $ref('singleCustomerResponseSchema'),
				},
			},
		},
		deleteCustomerHandler
	);
}

export default customerRoutes;
