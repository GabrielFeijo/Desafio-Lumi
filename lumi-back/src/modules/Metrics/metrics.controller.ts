import { FastifyReply, FastifyRequest } from 'fastify';
import { getTotalCustomers, getTotalInvoices } from './metrics.service';

export async function getTotalInvoicesHandler(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const data = await getTotalInvoices();

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function getTotalCustomersHandler(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const data = await getTotalCustomers();

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}
