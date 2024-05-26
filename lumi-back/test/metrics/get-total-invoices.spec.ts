import { FastifyInstance } from 'fastify';
import buildApp from '../../src/app';

describe('GET /api/metrics/total-invoices', () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = await buildApp({ logger: false });
	});

	afterAll(async () => {
		await app.close();
	});

	it('should return status 200 with total invoices and difference as numbers', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/metrics/total-invoices',
		});

		const data = response.json();

		expect(response.statusCode).toBe(200);
		expect(data).toHaveProperty('total');
		expect(data.total).toEqual(expect.any(Number));
		expect(data).toHaveProperty('difference');
		expect(data.difference).toEqual(expect.any(Number));
	});
});
