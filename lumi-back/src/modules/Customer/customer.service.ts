import { db } from '../../utils/prisma';
import { CreateCustomerInput } from './customer.schema';

export async function createCustomer(data: CreateCustomerInput) {
	const customer = await db.customer.create({
		data,
	});

	return customer;
}

export async function getCustomerByCustomerId(customerNumber: bigint) {
	const customer = await db.customer.findUnique({
		where: {
			customerNumber,
		},
	});

	return customer;
}

export async function getCustomers() {
	const customer = await db.customer.findMany();

	return customer;
}
