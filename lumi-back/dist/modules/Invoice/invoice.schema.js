"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.invoiceSchemas = void 0;
const fastify_zod_1 = require("fastify-zod");
const z = __importStar(require("zod"));
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
const createInvoiceSchema = z.object(Object.assign({}, invoiceCore));
const singleInvoiceResponseSchema = z.object(Object.assign(Object.assign(Object.assign({}, invoiceGenerated), invoiceCore), { customer: z.object({ name: z.string(), id: z.string().cuid() }) }));
const singleInvoiceResponseSchemaWithCustomer = z.object(Object.assign(Object.assign({}, invoiceGenerated), invoiceCore));
const invoicesResponseSchema = z.array(singleInvoiceResponseSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createInvoiceSchema,
    singleInvoiceResponseSchema,
    singleInvoiceResponseSchemaWithCustomer,
    invoicesResponseSchema,
}, {
    $id: 'invoiceSchemas',
}), exports.invoiceSchemas = _a.schemas, exports.$ref = _a.$ref;
//# sourceMappingURL=invoice.schema.js.map