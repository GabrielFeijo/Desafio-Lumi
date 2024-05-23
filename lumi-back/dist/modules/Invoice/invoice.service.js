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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPDFUpload = exports.getInvoicesByCustomerNumberAndReferenceMonth = exports.getInvoices = exports.createInvoice = void 0;
const prisma_1 = require("../../utils/prisma");
const extract_data_1 = require("../../utils/extract-data");
const positions_1 = require("../../constants/positions");
const extract_values_1 = require("../../utils/extract-values");
const transform_sequencial_values_1 = require("../../utils/transform-sequencial-values");
const customer_service_1 = require("../Customer/customer.service");
const transform_to_date_1 = require("../../utils/transform-to-date");
const aws_service_1 = require("../Aws/aws.service");
function createInvoice(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoice = yield prisma_1.db.invoice.create({
            data,
        });
        return invoice;
    });
}
exports.createInvoice = createInvoice;
function getInvoices() {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = yield prisma_1.db.invoice.findMany({
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return invoices;
    });
}
exports.getInvoices = getInvoices;
function getInvoicesByCustomerNumberAndReferenceMonth(_a) {
    return __awaiter(this, arguments, void 0, function* ({ customerId, referenceMonth, }) {
        const invoice = yield prisma_1.db.invoice.findFirst({
            where: {
                customerId,
                referenceMonth,
            },
        });
        return invoice;
    });
}
exports.getInvoicesByCustomerNumberAndReferenceMonth = getInvoicesByCustomerNumberAndReferenceMonth;
function processPDFUpload(part) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        if (part.file) {
            const buffers = [];
            try {
                for (var _d = true, _e = __asyncValues(part.file), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const chunk = _c;
                    buffers.push(chunk);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const pdfBuffer = Buffer.concat(buffers);
            const data = yield (0, extract_data_1.extractDataFromPdf)(pdfBuffer);
            const content = data.pages[0].content;
            const _g = (0, extract_values_1.extractSingleValues)(content, positions_1.positions), { customerNumber, name } = _g, rest = __rest(_g, ["customerNumber", "name"]);
            const existingFile = yield getInvoicesByCustomerNumberAndReferenceMonth({
                referenceMonth: rest.referenceMonth,
                customerId: BigInt(customerNumber),
            });
            if (existingFile) {
                throw new Error('Invoice already exists');
            }
            const sequencialValues = (0, extract_values_1.extractSequentialValues)(content, positions_1.startItemPositions, positions_1.SPACING);
            const renamedValues = (0, transform_sequencial_values_1.transformValues)(sequencialValues);
            const url = yield (0, aws_service_1.uploadFile)(pdfBuffer, part.filename);
            let customer = yield (0, customer_service_1.getCustomerByCustomerId)(BigInt(customerNumber));
            if (!customer) {
                customer = yield (0, customer_service_1.createCustomer)({
                    name: name,
                    customerNumber: BigInt(customerNumber),
                });
            }
            const invoice = yield createInvoice(Object.assign(Object.assign({}, renamedValues), { customerId: BigInt(customerNumber), installationNumber: BigInt(rest.installationNumber), dueDate: (0, transform_to_date_1.transformToDate)(rest.dueDate), totalAmount: parseFloat(rest.totalAmount.replace(',', '.')), referenceMonth: rest.referenceMonth, pdfUrl: url }));
            return invoice;
        }
    });
}
exports.processPDFUpload = processPDFUpload;
//# sourceMappingURL=invoice.service.js.map