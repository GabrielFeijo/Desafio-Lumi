import { Invoice } from '@prisma/client';
import { db } from '../../utils/prisma';
import { startOfMonth, subMonths } from 'date-fns';
import { sortByMonth } from '../../utils/sort-by-month';

export async function getTotalInvoices(): Promise<{
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

export async function getTotalCustomers(): Promise<{
	total: number;
	difference: number;
}> {
	const totalCustomers = await db.customer.count();

	const currentDate = new Date();
	const startOfCurrentMonth = startOfMonth(currentDate);
	const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));

	const customersInCurrentMonth = await db.customer.count({
		where: {
			createdAt: {
				gte: startOfCurrentMonth,
			},
		},
	});

	const customersInPreviousMonth = await db.customer.count({
		where: {
			createdAt: {
				gte: startOfPreviousMonth,
				lt: startOfCurrentMonth,
			},
		},
	});

	const difference = customersInCurrentMonth - customersInPreviousMonth;

	return {
		total: totalCustomers,
		difference: difference,
	};
}

export async function getTotalEnergyConsumption(): Promise<{
	total: number;
}> {
	const invoices: Invoice[] = await db.invoice.findMany();

	let total = 0;

	invoices.forEach((invoice) => {
		total +=
			Number(invoice.energyQuantity) +
			(Number(invoice.exemptEnergyQuantity) || 0);
	});

	return { total };
}

export async function getTotalEnergyCompensated(): Promise<{
	total: number;
}> {
	const invoices: Invoice[] = await db.invoice.findMany();

	let total = 0;

	invoices.forEach((invoice) => {
		total += Number(invoice.compensatedEnergyQuantity) || 0;
	});

	return { total };
}

export async function getEnergyStats(customerNumber?: bigint): Promise<
	{
		referenceMonth: string;
		energyConsumption: number;
		energyCompensated: number;
	}[]
> {
	const invoices: Invoice[] = await db.invoice.findMany({
		where: {
			customerId: customerNumber,
		},
	});

	const energyStats: Record<
		string,
		{ energyConsumption: number; energyCompensated: number }
	> = {};

	invoices.forEach((invoice) => {
		const {
			referenceMonth,
			energyQuantity,
			exemptEnergyQuantity,
			compensatedEnergyQuantity,
		} = invoice;

		if (!energyStats[referenceMonth]) {
			energyStats[referenceMonth] = {
				energyConsumption: 0,
				energyCompensated: 0,
			};
		}

		const energyConsumption =
			Number(energyQuantity) + (Number(exemptEnergyQuantity) || 0);
		const energyCompensated = compensatedEnergyQuantity || 0;

		energyStats[referenceMonth].energyConsumption += energyConsumption;
		energyStats[referenceMonth].energyCompensated += Number(energyCompensated);
	});

	const data = Object.keys(energyStats)
		.map((referenceMonth) => ({
			referenceMonth,
			energyConsumption: energyStats[referenceMonth].energyConsumption,
			energyCompensated: energyStats[referenceMonth].energyCompensated,
		}))
		.sort(sortByMonth);

	return data;
}

export async function getEnergyValues(customerNumber?: bigint): Promise<
	{
		referenceMonth: string;
		consumedEnergyValue: number;
		compensatedEnergyValue: number;
	}[]
> {
	const invoices: Invoice[] = await db.invoice.findMany({
		where: {
			customerId: customerNumber,
		},
	});

	const energyStats: Record<
		string,
		{ consumedEnergyValue: number; compensatedEnergyValue: number }
	> = {};

	invoices.forEach((invoice) => {
		const {
			referenceMonth,
			energyAmount,
			exemptEnergyAmount,
			municipalPublicLightingContribution,
			compensatedEnergyAmount,
		} = invoice;

		if (!energyStats[referenceMonth]) {
			energyStats[referenceMonth] = {
				consumedEnergyValue: 0,
				compensatedEnergyValue: 0,
			};
		}

		const consumedEnergyValue =
			Number(energyAmount) +
			Number(exemptEnergyAmount || 0) +
			Number(municipalPublicLightingContribution);
		const compensatedEnergyValue = Number(compensatedEnergyAmount) || 0;

		energyStats[referenceMonth].consumedEnergyValue += consumedEnergyValue;
		energyStats[referenceMonth].compensatedEnergyValue +=
			compensatedEnergyValue;
	});

	const data = Object.keys(energyStats)
		.map((referenceMonth) => ({
			referenceMonth,
			consumedEnergyValue: energyStats[referenceMonth].consumedEnergyValue,
			compensatedEnergyValue:
				energyStats[referenceMonth].compensatedEnergyValue,
		}))
		.sort(sortByMonth);

	return data;
}
