import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCustomerInput } from './customer.schema';
import { createCustomer } from './customer.service';

export async function registerCustomerHandler(
	request: FastifyRequest<{ Body: CreateCustomerInput }>,
	reply: FastifyReply
) {
	const body = request.body;

	try {
		const customer = await createCustomer(body);

		return reply.status(201).send(customer);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}
