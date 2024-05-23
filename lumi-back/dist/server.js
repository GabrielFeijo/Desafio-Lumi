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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const customer_schema_1 = require("./modules/Customer/customer.schema");
const customer_route_1 = __importDefault(require("./modules/Customer/customer.route"));
const invoice_route_1 = __importDefault(require("./modules/Invoice/invoice.route"));
const invoice_schema_1 = require("./modules/Invoice/invoice.schema");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const aws_route_1 = __importDefault(require("./modules/Aws/aws.route"));
const aws_schema_1 = require("./modules/Aws/aws.schema");
const metrics_route_1 = __importDefault(require("./modules/Metrics/metrics.route"));
const metrics_schema_1 = require("./modules/Metrics/metrics.schema");
exports.app = (0, fastify_1.default)();
exports.app.register(cors_1.default, { origin: true });
exports.app.register(multipart_1.default);
exports.app.get('/', () => __awaiter(void 0, void 0, void 0, function* () {
    return { message: 'Hello World!' };
}));
const swaggerOptions = {
    swagger: {
        info: {
            title: 'Desafio Técnico - Gabriel Feijó',
            description: 'A REST API built with Fastify, Prisma and TypeScript',
            version: '1.0.0',
            contact: {
                name: 'Gabriel da Silva Feijó',
                url: 'https://www.linkedin.com/in/gabriel-feijo/',
                email: 'feijo6622@gmail.com',
            },
        },
        basePath: '/',
        schemes: ['http', 'https'],
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json'],
    },
};
const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const schema of [
            ...customer_schema_1.customerSchemas,
            ...invoice_schema_1.invoiceSchemas,
            ...aws_schema_1.awsSchemas,
            ...metrics_schema_1.metricsSchemas,
        ]) {
            exports.app.addSchema(schema);
        }
        exports.app.register(swagger_1.default, swaggerOptions);
        exports.app.register(swagger_ui_1.default, swaggerUiOptions);
        exports.app.ready((err) => {
            if (err)
                throw err;
            exports.app.swagger();
        });
        exports.app.register(metrics_route_1.default, { prefix: 'api/metrics' });
        exports.app.register(customer_route_1.default, { prefix: 'api/customers' });
        exports.app.register(invoice_route_1.default, { prefix: 'api/invoices' });
        exports.app.register(aws_route_1.default, { prefix: 'api/s3' });
        try {
            yield exports.app.listen({ port: 3333 });
            console.log(`Server running on 3333`);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
}
main();
//# sourceMappingURL=server.js.map