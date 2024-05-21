import { MultipartFile } from '@fastify/multipart';
import { db } from '../../utils/prisma';
import { CreateInvoiceInput } from './invoice.schema';
import { extractDataFromPdf } from '../../utils/extract-data';

export async function createInvoice(data: CreateInvoiceInput) {
	const invoice = await db.invoice.create({
		data,
	});

	return invoice;
}

export async function getInvoices() {
	const invoices = await db.invoice.findMany({
		include: {
			customer: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	return invoices;
}

export async function processPDFUpload(
	parts: AsyncIterableIterator<MultipartFile>
) {
	for await (const part of parts) {
		if (part.file) {
			const buffers = [];
			for await (const chunk of part.file) {
				buffers.push(chunk);
			}

			const pdfBuffer = Buffer.concat(buffers);

			const data = await extractDataFromPdf(pdfBuffer);

			return data;
		}
	}
}
