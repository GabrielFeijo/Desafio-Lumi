import { FastifyInstance } from 'fastify';
import buildApp from '../../src/app';

describe('GET /api/metrics/total-energy-compensated', () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = await buildApp({ logger: false });
	});

	afterAll(async () => {
		await app.close();
	});

	it('should return status 200 with total energy compensated by users as a number', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/metrics/total-energy-compensated',
		});

		const data = response.json();

		expect(response.statusCode).toBe(200);
		expect(data).toHaveProperty('total');
		expect(data.total).toEqual(expect.any(Number));
	});
});
