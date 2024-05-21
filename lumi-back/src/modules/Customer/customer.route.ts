import { FastifyInstance } from 'fastify';
import { $ref } from './customer.schema';
import { registerCustomerHandler } from './customer.controller';

async function customerRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{
			schema: {
				tags: ['Customers'],
				summary: 'Register customer',
				body: $ref('createCustomerSchema'),
				response: {
					201: $ref('createCustomerResponseSchema'),
				},
			},
		},
		registerCustomerHandler
	);
}

export default customerRoutes;
