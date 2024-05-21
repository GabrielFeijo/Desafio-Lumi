import fastify from 'fastify';
import cors from '@fastify/cors';
import { customerSchemas } from './modules/Customer/customer.schema';
import customerRoutes from './modules/Customer/customer.route';
import invoiceRoutes from './modules/Invoice/invoice.route';
import { invoiceSchemas } from './modules/Invoice/invoice.schema';
import fastifyMultipart from '@fastify/multipart';

export const app = fastify();

app.register(cors, { origin: true });
app.register(fastifyMultipart);

app.get('/', async () => {
	return { message: 'Hello World!' };
});

async function main() {
	for (const schema of [...customerSchemas, ...invoiceSchemas]) {
		app.addSchema(schema);
	}

	app.register(customerRoutes, { prefix: 'api/customers' });
	app.register(invoiceRoutes, { prefix: 'api/invoices' });

	try {
		await app.listen({ port: 3333 });
		console.log(`Server running on 3333`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

main();
