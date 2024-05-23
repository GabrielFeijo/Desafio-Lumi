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
exports.getEnergyValuesHandler = exports.getEnergyStatsHandler = exports.getTotalEnergyCompensatedHandler = exports.getTotalEnergyConsumptionHandler = exports.getTotalCustomersHandler = exports.getTotalInvoicesHandler = void 0;
const metrics_service_1 = require("./metrics.service");
function getTotalInvoicesHandler(_, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, metrics_service_1.getTotalInvoices)();
            return reply.status(200).send(data);
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
exports.getTotalInvoicesHandler = getTotalInvoicesHandler;
function getTotalCustomersHandler(_, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, metrics_service_1.getTotalCustomers)();
            return reply.status(200).send(data);
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
exports.getTotalCustomersHandler = getTotalCustomersHandler;
function getTotalEnergyConsumptionHandler(_, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, metrics_service_1.getTotalEnergyConsumption)();
            return reply.status(200).send(data);
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
exports.getTotalEnergyConsumptionHandler = getTotalEnergyConsumptionHandler;
function getTotalEnergyCompensatedHandler(_, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, metrics_service_1.getTotalEnergyCompensated)();
            return reply.status(200).send(data);
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
exports.getTotalEnergyCompensatedHandler = getTotalEnergyCompensatedHandler;
function getEnergyStatsHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { customerNumber } = request.query;
            const data = yield (0, metrics_service_1.getEnergyStats)(customerNumber);
            return reply.status(200).send(data);
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
exports.getEnergyStatsHandler = getEnergyStatsHandler;
function getEnergyValuesHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { customerNumber } = request.query;
            const data = yield (0, metrics_service_1.getEnergyValues)(customerNumber);
            return reply.status(200).send(data);
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
exports.getEnergyValuesHandler = getEnergyValuesHandler;
//# sourceMappingURL=metrics.controller.js.map