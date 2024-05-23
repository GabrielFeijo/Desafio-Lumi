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

export async function getInvoicesHandler(
	request: FastifyRequest<{
		Querystring: {
			pageIndex: number;
			customerNumber?: string;
			referenceMonth?: string;
		};
	}>,
	reply: FastifyReply
) {
	const { pageIndex, customerNumber, referenceMonth } = request.query;
	try {
		const invoices = await getInvoices(
			pageIndex,
			customerNumber,
			referenceMonth
		);
		return reply.status(200).send(invoices);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function uploadFileHandler(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const part = await request.file();

		if (!part) {
			return reply.status(400).send({
				message: 'No file uploaded',
			});
		}

		const data = await processPDFUpload(part);

		reply.status(201).send(data);
	} catch (error) {
		if (error instanceof Error) {
			return reply.status(409).send({
				message: 'Something went wrong',
				error: error.message,
			});
		}

		return reply.status(500).send({
			message: 'Something went wrong',
		});
	}
}
