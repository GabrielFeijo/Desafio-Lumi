import { FastifyInstance } from 'fastify';
import buildApp from '../../src/app';

let app: FastifyInstance;

beforeAll(async () => {
	app = await buildApp({ logger: false });
});

afterAll(async () => {
	await app.close();
});

describe('GET /api/invoices (Valid Query Parameters)', () => {
	it('should return 200 and ensure each invoice object has the required properties', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/invoices',
			query: {
				pageIndex: '0',
			},
		});

		const data = response.json();

		expect(response.statusCode).toBe(200);
		expect(data).toHaveProperty('invoices');
		expect(Array.isArray(data.invoices)).toBe(true);
		expect(data).toHaveProperty('meta');
	});
});
describe('GET /api/invoices (Missing pageIndex Query Parameter)', () => {
	it('should return status 400 and an error message when pageIndex query parameter is missing', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/invoices',
		});

		expect(response.statusCode).toBe(400);
		expect(response.json()).toHaveProperty(
			'message',
			"querystring must have required property 'pageIndex'"
		);
	});
});
