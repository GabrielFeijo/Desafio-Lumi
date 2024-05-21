import { db } from '../../utils/prisma';
import { CreateInvoiceInput } from './invoice.schema';

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
