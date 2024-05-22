import { FastifyReply, FastifyRequest } from 'fastify';
import { getInvoiceTotal } from './metrics.service';

export async function registerCustomerHandler(reply: FastifyReply) {
	try {
		const data = await getInvoiceTotal();

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}
