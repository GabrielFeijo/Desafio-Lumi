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
const metrics_controller_1 = require("./metrics.controller");
function metricRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/total-invoices', {
            schema: {
                tags: ['Metrics'],
                summary: 'Get total number of invoices.',
            },
        }, metrics_controller_1.getTotalInvoicesHandler);
        app.get('/total-customers', {
            schema: {
                tags: ['Metrics'],
                summary: 'Get total number of customers.',
            },
        }, metrics_controller_1.getTotalCustomersHandler);
        app.get('/total-energy-consumption', {
            schema: {
                tags: ['Metrics'],
                summary: 'Get total energy consumption.',
            },
        }, metrics_controller_1.getTotalEnergyConsumptionHandler);
        app.get('/total-energy-compensated', {
            schema: {
                tags: ['Metrics'],
                summary: 'Get total energy compensated.',
            },
        }, metrics_controller_1.getTotalEnergyCompensatedHandler);
        app.get('/energy-stats', {
            schema: {
                tags: ['Metrics'],
                summary: 'Get energy stats.',
                querystring: {
                    type: 'object',
                    properties: {
                        customerNumber: { type: 'string' },
                    },
                    required: [],
                },
            },
        }, metrics_controller_1.getEnergyStatsHandler);
        app.get('/energy-values', {
            schema: {
                tags: ['Metrics'],
                summary: 'Get energy values.',
                querystring: {
                    type: 'object',
                    properties: {
                        customerNumber: { type: 'string' },
                    },
                    required: [],
                },
            },
        }, metrics_controller_1.getEnergyValuesHandler);
    });
}
exports.default = metricRoutes;
//# sourceMappingURL=metrics.route.js.map