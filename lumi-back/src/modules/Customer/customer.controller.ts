import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCustomerInput, ParamsSchema } from './customer.schema';
import {
	createCustomer,
	deleteCustomer,
	getCustomers,
} from './customer.service';
import { ApiError } from '../../../apiError';

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

export async function deleteCustomerHandler(
	request: FastifyRequest<{ Params: ParamsSchema }>,
	reply: FastifyReply
) {
	const { id } = request.params;
	try {
		const deletedInvoice = await deleteCustomer(id);

		return reply.status(200).send(deletedInvoice);
	} catch (error) {
		if (error instanceof ApiError) {
			return reply.status(error.statusCode).send({
				error: error.message,
			});
		}
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}
