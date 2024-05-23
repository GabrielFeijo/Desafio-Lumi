"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_schema_1 = require("./invoice.schema");
const invoice_controller_1 = require("./invoice.controller");
function invoiceRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/', {
            schema: {
                tags: ['Invoices'],
                summary: 'Create invoice',
                body: (0, invoice_schema_1.$ref)('createInvoiceSchema'),
                response: {
                    201: (0, invoice_schema_1.$ref)('singleInvoiceResponseSchema'),
                },
            },
        }, invoice_controller_1.createInvoiceHandler);
        app.post('/upload', {
            schema: {
                tags: ['Invoices'],
                summary: 'Extract invoice data from PDF',
                consumes: ['multipart/form-data'],
                response: {
                    201: (0, invoice_schema_1.$ref)('singleInvoiceResponseSchemaWithCustomer'),
                },
            },
        }, invoice_controller_1.uploadFileHandler);
        app.get('/', {
            schema: {
                tags: ['Invoices'],
                summary: 'Get invoices',
                response: {
                    200: (0, invoice_schema_1.$ref)('invoicesResponseSchema'),
                },
            },
        }, invoice_controller_1.getInvoicesHandler);
    });
}
exports.default = invoiceRoutes;
//# sourceMappingURL=invoice.route.js.map