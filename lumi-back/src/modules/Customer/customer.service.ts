import { db } from '../../utils/prisma';
import { CreateCustomerInput } from './customer.schema';

export async function createCustomer(data: CreateCustomerInput) {
	const customer = await db.customer.create({
		data,
	});

	return customer;
}
