import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateInvoiceInput } from './invoice.schema';
import {
	createInvoice,
	getInvoices,
	processPDFUpload,
} from './invoice.service';

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

export async function uploadFileHandler(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const parts = request.files();

		const data = await processPDFUpload(parts);

		reply.status(200).send({ data });
	} catch (error) {
		console.error(`Error handling upload: ${error}`);
		reply.status(500).send({ error: 'Error handling upload' });
	}
}
