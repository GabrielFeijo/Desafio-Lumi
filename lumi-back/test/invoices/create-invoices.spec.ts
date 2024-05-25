import { FastifyInstance } from 'fastify';
import buildApp from '../../src/app';
import { PrismaClient } from '@prisma/client';

const customer = {
	name: 'John Doe',
	customerNumber: 43124131,
};

const invoice = {
	installationNumber: 43124131,
	referenceMonth: 'JAN/2023',
	totalAmount: 90.1,
	dueDate: new Date('02/06/2024'),
	energyQuantity: 100,
	energyAmount: 74.84,
	exemptEnergyQuantity: 50,
	exemptEnergyAmount: 24.84,
	compensatedEnergyQuantity: 52,
	compensatedEnergyAmount: 14.84,
	municipalPublicLightingContribution: 21,
	customerId: customer.customerNumber,
	pdfUrl: 'http://localhost:3333/api/invoices/1298232.pdf',
	createdAt: '2023-01-01T00:00:00.000Z',
	updatedAt: '2023-01-01T00:00:00.000Z',
};

let app: FastifyInstance;
let createdInvoiceId: string;

beforeAll(async () => {
	app = await buildApp({ logger: false });
});

afterAll(async () => {
	const prisma = new PrismaClient();

	await prisma.customer.delete({
		where: { customerNumber: customer.customerNumber },
	});

	if (createdInvoiceId) {
		await prisma.invoice.delete({
			where: { id: createdInvoiceId },
		});
	}

	await prisma.$disconnect();
	await app.close();
});

describe('POST /api/invoices', () => {
	it('should create a new invoice and return status 201', async () => {
		await app.inject({
			method: 'POST',
			url: '/api/customers',
			body: customer,
		});

		const response = await app.inject({
			method: 'POST',
			url: '/api/invoices',
			body: invoice,
		});

		const data = response.json();

		createdInvoiceId = data.invoiceId;

		expect(response.statusCode).toBe(201);
		expect(data).toHaveProperty('customerId', invoice.customerId);
		expect(data).toHaveProperty('totalAmount', invoice.totalAmount);
		expect(data).toHaveProperty('pdfUrl', invoice.pdfUrl);
		expect(data).toHaveProperty('energyQuantity', invoice.energyQuantity);
		expect(data).toHaveProperty('energyAmount', invoice.energyAmount);
		expect(data).toHaveProperty('pdfUrl', invoice.pdfUrl);
	});
});

describe('POST /api/invoices', () => {
	it('should create a new invoice and return status 201', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/invoices',
			body: invoice,
		});

		const data = response.json();

		expect(response.statusCode).toBe(409);
		expect(data).toHaveProperty('error', 'Invoice already exists');
	});
});

describe('POST /api/invoices (Bad Request)', () => {
	it('should return status 400 if energyQuantity is missing', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/invoices',
			body: {
				installationNumber: 43124131,
				referenceMonth: 'JAN/2023',
				totalAmount: 90.1,
				dueDate: new Date('02/06/2024'),
			},
		});

		const data = response.json();

		expect(response.statusCode).toBe(400);
		expect(data).toHaveProperty(
			'message',
			"body must have required property 'energyQuantity'"
		);
	});
});
