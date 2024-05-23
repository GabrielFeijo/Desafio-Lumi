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
const customer_schema_1 = require("./customer.schema");
const customer_controller_1 = require("./customer.controller");
function customerRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/', {
            schema: {
                tags: ['Customers'],
                summary: 'Register customer',
                body: (0, customer_schema_1.$ref)('createCustomerSchema'),
                response: {
                    201: (0, customer_schema_1.$ref)('singleCustomerResponseSchema'),
                },
            },
        }, customer_controller_1.registerCustomerHandler);
        app.get('/', {
            schema: {
                tags: ['Customers'],
                summary: 'Get customers',
                response: {
                    200: (0, customer_schema_1.$ref)('customersResponseSchema'),
                },
            },
        }, customer_controller_1.getCustomersHandler);
    });
}
exports.default = customerRoutes;
//# sourceMappingURL=customer.route.js.map