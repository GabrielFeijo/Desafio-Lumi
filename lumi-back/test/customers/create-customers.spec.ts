import { FastifyInstance } from 'fastify';
import buildApp from '../../src/app';
import { PrismaClient } from '@prisma/client';

const customer = {
	name: 'John Doe',
	customerNumber: 123,
};

let app: FastifyInstance;

beforeAll(async () => {
	app = await buildApp({ logger: false });
});

afterAll(async () => {
	const prisma = new PrismaClient();

	await prisma.customer.delete({
		where: { customerNumber: customer.customerNumber },
	});
	await prisma.$disconnect();
	await app.close();
});

describe('POST /api/customers (Create Customer)', () => {
	it('should create a new customer and return status 201 with customer details', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/customers',
			body: customer,
		});

		const createdCustomer = response.json();

		expect(response.statusCode).toBe(201);
		expect(createdCustomer).toHaveProperty('name', customer.name);
		expect(createdCustomer).toHaveProperty(
			'customerNumber',
			customer.customerNumber
		);
		expect(createdCustomer).toHaveProperty('updatedAt');
		expect(createdCustomer).toHaveProperty('createdAt');
	});
});

describe('POST /api/customers (Conflict Error)', () => {
	it('should return status 409 if customer already exists', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/customers',
			body: customer,
		});

		expect(response.statusCode).toBe(409);
		expect(response.json()).toHaveProperty(
			'message',
			'Customer with the same customer number already exists.'
		);
	});
});

describe('POST /api/customers (Missing customerNumber)', () => {
	it('should return status 400 if customerNumber is missing', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/customers',
			body: {
				name: 'John Doe',
			},
		});

		const data = response.json();

		expect(response.statusCode).toBe(400);
		expect(data).toHaveProperty(
			'message',
			"body must have required property 'customerNumber'"
		);
	});
});

describe('POST /api/customers (Missing name)', () => {
	it('should return status 400 if name is missing', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/customers',
			body: {
				customerNumber: 123,
			},
		});

		const data = response.json();

		expect(response.statusCode).toBe(400);
		expect(data).toHaveProperty(
			'message',
			"body must have required property 'name'"
		);
	});
});
