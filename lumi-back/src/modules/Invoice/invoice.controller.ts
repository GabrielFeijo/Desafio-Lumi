import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateInvoiceInput, ParamsSchema } from './invoice.schema';
import {
	createInvoice,
	deleteInvoice,
	getInvoices,
	processPDFUpload,
} from './invoice.service';
import { ApiError } from '../../utils/apiError';

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
		const part = request.files();

		if (!part) {
			return reply.status(400).send({
				message: 'No file uploaded',
			});
		}

		const data = await processPDFUpload(part);

		reply.status(201).send(data);
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

export async function deleteInvoiceHandler(
	request: FastifyRequest<{ Params: ParamsSchema }>,
	reply: FastifyReply
) {
	const { id } = request.params;
	try {
		const deletedInvoice = await deleteInvoice(id);

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
