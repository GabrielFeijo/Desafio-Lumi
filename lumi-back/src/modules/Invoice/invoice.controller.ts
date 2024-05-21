import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateInvoiceInput } from './invoice.schema';
import { createInvoice, getInvoices } from './invoice.service';

export async function createInvoiceHandler(
	request: FastifyRequest<{ Body: CreateInvoiceInput }>,
	reply: FastifyReply
) {
	const body = request.body;

	try {
		const invoice = await createInvoice(body);

		return reply.status(201).send(invoice);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function getInvoicesHandler() {
	const invoices = await getInvoices();

	return invoices;
}
