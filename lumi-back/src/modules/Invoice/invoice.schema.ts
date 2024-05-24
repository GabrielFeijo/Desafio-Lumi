import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const invoiceCore = {
	installationNumber: z.bigint({
		required_error: 'installationNumber is required',
		invalid_type_error: 'installationNumber must be a bigint',
	}),
	referenceMonth: z.string({
		required_error: 'referenceMonth is required',
		invalid_type_error: 'referenceMonth must be a string',
	}),
	totalAmount: z.number({
		required_error: 'totalAmount is required',
		invalid_type_error: 'totalAmount must be a number',
	}),
	dueDate: z.date({
		required_error: 'dueDate is required',
		invalid_type_error: 'dueDate must be a date',
	}),
	energyQuantity: z.number({
		required_error: 'energyQuantity is required',
		invalid_type_error: 'energyQuantity must be a number',
	}),
	energyAmount: z.number({
		required_error: 'energyAmount is required',
		invalid_type_error: 'energyAmount must be a number',
	}),
	exemptEnergyQuantity: z
		.number({
			invalid_type_error: 'exemptEnergyAmount must be a number',
		})
		.optional(),
	exemptEnergyAmount: z
		.number({
			invalid_type_error: 'exemptEnergyAmount must be a number',
		})
		.optional(),
	compensatedEnergyQuantity: z
		.number({
			invalid_type_error: 'exemptEnergyAmount must be a number',
		})
		.optional(),
	compensatedEnergyAmount: z
		.number({
			invalid_type_error: 'exemptEnergyAmount must be a number',
		})
		.optional(),
	municipalPublicLightingContribution: z.number({
		required_error: 'municipalPublicLightingContribution is required',
		invalid_type_error: 'exemptEnergyAmount must be a number',
	}),
	pdfUrl: z.string().url(),
	customerId: z.bigint({
		required_error: 'customerId is required',
		invalid_type_error: 'customerId must be a bigint',
	}),
};

const invoiceGenerated = {
	id: z.string().cuid(),
	createdAt: z.string(),
	updatedAt: z.string(),
};

const createInvoiceSchema = z.object({
	...invoiceCore,
});

const singleInvoiceResponseSchema = z.object({
	...invoiceGenerated,
	...invoiceCore,
	customer: z.object({ name: z.string(), id: z.string().cuid() }),
});

const singleInvoiceResponseSchemaWithOutCustomer = z.object({
	...invoiceGenerated,
	...invoiceCore,
});

const manyInvoicesResponseSchemaWithOutCustomer = z.object({
	invoices: z.array(singleInvoiceResponseSchemaWithOutCustomer),
});

const invoicesResponseSchema = z.object({
	invoices: z.array(singleInvoiceResponseSchema),
	meta: z.object({
		pageIndex: z.number(),
		totalCount: z.number(),
		perPage: z.number(),
	}),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

const paramsSchema = z.object({
	id: z.string(),
});

export type ParamsSchema = z.infer<typeof paramsSchema>;

export const { schemas: invoiceSchemas, $ref } = buildJsonSchemas(
	{
		createInvoiceSchema,
		singleInvoiceResponseSchema,
		singleInvoiceResponseSchemaWithOutCustomer,
		manyInvoicesResponseSchemaWithOutCustomer,
		invoicesResponseSchema,
		paramsSchema,
	},
	{
		$id: 'invoiceSchemas',
	}
);
