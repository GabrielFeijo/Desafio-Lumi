import { FastifyInstance } from 'fastify';
import buildApp from '../../src/app';

describe('GET /api/customers (Retrieve All Customers)', () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = await buildApp({ logger: false });
	});

	afterAll(async () => {
		await app.close();
	});

	it('should return 200 and ensure each customer object has the required properties', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/customers',
		});

		const data = response.json();

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		data.forEach(
			(customer: {
				id: string;
				name: string;
				customerNumber: bigint;
				updatedAt: string;
				createdAt: string;
			}) => {
				expect(customer).toHaveProperty('id');
				expect(customer).toHaveProperty('name');
				expect(customer).toHaveProperty('customerNumber');
				expect(customer).toHaveProperty('updatedAt');
				expect(customer).toHaveProperty('createdAt');
			}
		);
	});
});
