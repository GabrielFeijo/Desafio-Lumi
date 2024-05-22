import { db } from '../../utils/prisma';
import { startOfMonth, subMonths } from 'date-fns';

export async function getInvoiceTotal(): Promise<{
	total: number;
	difference: number;
}> {
	const totalInvoices = await db.invoice.count();

	const currentDate = new Date();
	const startOfCurrentMonth = startOfMonth(currentDate);
	const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));

	const invoicesInCurrentMonth = await db.invoice.count({
		where: {
			createdAt: {
				gte: startOfCurrentMonth,
			},
		},
	});

	const invoicesInPreviousMonth = await db.invoice.count({
		where: {
			createdAt: {
				gte: startOfPreviousMonth,
				lt: startOfCurrentMonth,
			},
		},
	});

	const difference = invoicesInCurrentMonth - invoicesInPreviousMonth;

	return {
		total: totalInvoices,
		difference: difference,
	};
}
