import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCustomerInput } from './customer.schema';
import { createCustomer, getCustomers } from './customer.service';

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

export async function getCustomersHandler(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const customer = await getCustomers();

		return reply.status(200).send(customer);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}
