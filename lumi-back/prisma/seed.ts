import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const customer = {
	name: 'Gabriel da Silva Feijó',
	customerNumber: 40028922,
};

const invoices = [
	{
		installationNumber: 43124131,
		referenceMonth: 'JAN/2023',
		totalAmount: 90.1,
		dueDate: new Date('02/06/2024'),
		energyQuantity: 100,
		energyAmount: 74.84,
		exemptEnergyQuantity: 50,
		exemptEnergyAmount: 24.84,
		compensatedEnergyQuantity: 52,
		compensatedEnergyAmount: 14.84,
		municipalPublicLightingContribution: 21,
		customerId: customer.customerNumber,
		pdfUrl: 'https://desafio-gg.s3.amazonaws.com/pdf_teste.pdf',
		createdAt: '2023-01-01T00:00:00.000Z',
		updatedAt: '2023-01-01T00:00:00.000Z',
	},
	{
		installationNumber: 43124131,
		referenceMonth: 'FEV/2023',
		totalAmount: 90.1,
		dueDate: new Date('03/06/2024'),
		energyQuantity: 100,
		energyAmount: 74.84,
		exemptEnergyQuantity: 50,
		exemptEnergyAmount: 24.84,
		compensatedEnergyQuantity: 52,
		compensatedEnergyAmount: 14.84,
		municipalPublicLightingContribution: 21,
		customerId: customer.customerNumber,
		pdfUrl: 'https://desafio-gg.s3.amazonaws.com/pdf_teste.pdf',
		createdAt: '2023-01-01T00:00:00.000Z',
		updatedAt: '2023-01-01T00:00:00.000Z',
	},
	{
		installationNumber: 43124131,
		referenceMonth: 'MAR/2023',
		totalAmount: 90.1,
		dueDate: new Date('04/06/2024'),
		energyQuantity: 100,
		energyAmount: 74.84,
		exemptEnergyQuantity: 50,
		exemptEnergyAmount: 24.84,
		compensatedEnergyQuantity: 52,
		compensatedEnergyAmount: 14.84,
		municipalPublicLightingContribution: 21,
		customerId: customer.customerNumber,
		pdfUrl: 'https://desafio-gg.s3.amazonaws.com/pdf_teste.pdf',
		createdAt: '2023-01-01T00:00:00.000Z',
		updatedAt: '2023-01-01T00:00:00.000Z',
	},
	{
		installationNumber: 43124131,
		referenceMonth: 'ABR/2023',
		totalAmount: 90.1,
		dueDate: new Date('05/06/2024'),
		energyQuantity: 100,
		energyAmount: 74.84,
		exemptEnergyQuantity: 50,
		exemptEnergyAmount: 24.84,
		compensatedEnergyQuantity: 52,
		compensatedEnergyAmount: 14.84,
		municipalPublicLightingContribution: 21,
		customerId: customer.customerNumber,
		pdfUrl: 'https://desafio-gg.s3.amazonaws.com/pdf_teste.pdf',
		createdAt: '2023-01-01T00:00:00.000Z',
		updatedAt: '2023-01-01T00:00:00.000Z',
	},
];

const main = async () => {
	await prismaClient.customer.create({
		data: customer,
	});

	await prismaClient.invoice.createMany({
		data: invoices,
	});
};

main()
	.then(() => {
		console.log('Seed do banco de dados realizado com sucesso!');
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prismaClient.$disconnect();
	});
