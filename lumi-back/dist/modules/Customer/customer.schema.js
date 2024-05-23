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
exports.$ref = exports.customerSchemas = void 0;
const fastify_zod_1 = require("fastify-zod");
const z = __importStar(require("zod"));
const customerCore = {
    customerNumber: z.bigint({
        required_error: 'customerNumber is required',
        invalid_type_error: 'customerNumber must be a bigint',
    }),
    name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
    }),
};
const createCustomerSchema = z.object(Object.assign({}, customerCore));
const singleCustomerResponseSchema = z.object(Object.assign(Object.assign({ id: z.string().cuid() }, customerCore), { createdAt: z.string(), updatedAt: z.string() }));
const customersResponseSchema = z.array(singleCustomerResponseSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createCustomerSchema,
    singleCustomerResponseSchema,
    customersResponseSchema,
}), exports.customerSchemas = _a.schemas, exports.$ref = _a.$ref;
//# sourceMappingURL=customer.schema.js.map