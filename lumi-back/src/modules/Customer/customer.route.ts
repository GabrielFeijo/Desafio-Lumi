import { FastifyInstance } from 'fastify';
import { $ref } from './customer.schema';
import {
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
}

export default customerRoutes;
