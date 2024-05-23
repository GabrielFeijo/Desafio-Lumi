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
exports.uploadFileHandler = exports.getInvoicesHandler = exports.createInvoiceHandler = void 0;
const invoice_service_1 = require("./invoice.service");
function createInvoiceHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const invoice = yield (0, invoice_service_1.createInvoice)(body);
            return reply.status(201).send(invoice);
        }
        catch (error) {
            console.error(error);
            return reply.status(500).send({
                message: 'Something went wrong',
                error: error,
            });
        }
    });
}
exports.createInvoiceHandler = createInvoiceHandler;
function getInvoicesHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = yield (0, invoice_service_1.getInvoices)();
        return invoices;
    });
}
exports.getInvoicesHandler = getInvoicesHandler;
function uploadFileHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const part = yield request.file();
            if (!part) {
                return reply.status(400).send({
                    message: 'No file uploaded',
                });
            }
            const data = yield (0, invoice_service_1.processPDFUpload)(part);
            reply.status(201).send(data);
        }
        catch (error) {
            if (error instanceof Error) {
                return reply.status(409).send({
                    message: 'Something went wrong',
                    error: error.message,
                });
            }
            return reply.status(500).send({
                message: 'Something went wrong',
            });
        }
    });
}
exports.uploadFileHandler = uploadFileHandler;
//# sourceMappingURL=invoice.controller.js.map