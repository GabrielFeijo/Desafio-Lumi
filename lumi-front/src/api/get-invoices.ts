import { api } from '@/lib/axios';

export interface Invoice {
	id: string;
	installationNumber: number;
	totalAmount: number;
	referenceMonth: string;
	dueDate: string;
	energyQuantity: number;
	energyAmount: number;
	exemptEnergyQuantity: number;
	exemptEnergyAmount: number;
	compensatedEnergyQuantity: number;
	compensatedEnergyAmount: number;
	municipalPublicLightingContribution: number;
	pdfUrl: string;
	customerId: number;
	customer: {
		id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}
export type GetInvoicesResponse = {
	invoices: Array<Invoice>;
};

export async function getInvoices({
	pageIndex,
	customerNumber,
	referenceMonth,
}: {
	pageIndex: number;
	customerNumber?: string;
	referenceMonth?: string;
}) {
	const response = await api.get<GetInvoicesResponse>('/invoices');

	return response.data;
}
