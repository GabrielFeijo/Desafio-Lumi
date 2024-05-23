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
exports.getCustomersHandler = exports.registerCustomerHandler = void 0;
const customer_service_1 = require("./customer.service");
function registerCustomerHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const customer = yield (0, customer_service_1.createCustomer)(body);
            return reply.status(201).send(customer);
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
exports.registerCustomerHandler = registerCustomerHandler;
function getCustomersHandler(_, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customer = yield (0, customer_service_1.getCustomers)();
            return reply.status(200).send(customer);
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
exports.getCustomersHandler = getCustomersHandler;
//# sourceMappingURL=customer.controller.js.map