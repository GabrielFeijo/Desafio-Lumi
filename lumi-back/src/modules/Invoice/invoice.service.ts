import { MultipartFile } from '@fastify/multipart';
import { db } from '../../utils/prisma';
import { CreateInvoiceInput } from './invoice.schema';
import { extractDataFromPdf } from '../../utils/extract-data';
import {
	SPACING,
	positions,
	startItemPositions,
} from '../../constants/positions';
import {
	extractSequentialValues,
	extractSingleValues,
} from '../../utils/extract-values';
import { transformValues } from '../../utils/transform-sequencial-values';
import {
	createCustomer,
	getCustomerByCustomerId,
} from '../Customer/customer.service';
import { transformToDate } from '../../utils/transform-to-date';
import { uploadFile } from '../Aws/aws.service';

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

	return { invoices };
}

export async function getInvoicesByCustomerNumberAndReferenceMonth({
	customerId,
	referenceMonth,
}: {
	customerId: bigint;
	referenceMonth: string;
}) {
	const invoice = await db.invoice.findFirst({
		where: {
			customerId,
			referenceMonth,
		},
	});

	return invoice;
}

export async function processPDFUpload(part: MultipartFile) {
	if (part.file) {
		const buffers = [];
		for await (const chunk of part.file) {
			buffers.push(chunk);
		}

		const pdfBuffer = Buffer.concat(buffers);

		const data = await extractDataFromPdf(pdfBuffer);

		const content = data.pages[0].content;

		const { customerNumber, name, ...rest } = extractSingleValues(
			content,
			positions
		);

		const existingFile = await getInvoicesByCustomerNumberAndReferenceMonth({
			referenceMonth: rest.referenceMonth,
			customerId: BigInt(customerNumber),
		});

		if (existingFile) {
			throw new Error('Invoice already exists');
		}

		const sequencialValues = extractSequentialValues(
			content,
			startItemPositions,
			SPACING
		);

		const renamedValues = transformValues(sequencialValues);

		const url = await uploadFile({
			dataBuffer: pdfBuffer,
			filename: part.filename,
			mimetype: part.mimetype,
		});

		let customer = await getCustomerByCustomerId(BigInt(customerNumber));

		if (!customer) {
			customer = await createCustomer({
				name: name,
				customerNumber: BigInt(customerNumber),
			});
		}

		const invoice = await createInvoice({
			...renamedValues,
			customerId: BigInt(customerNumber),
			installationNumber: BigInt(rest.installationNumber),
			dueDate: transformToDate(rest.dueDate),
			totalAmount: parseFloat(rest.totalAmount.replace(',', '.')),
			referenceMonth: rest.referenceMonth,
			pdfUrl: url,
		});

		return invoice;
	}
}
