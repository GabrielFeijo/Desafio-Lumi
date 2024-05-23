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
exports.getEnergyValues = exports.getEnergyStats = exports.getTotalEnergyCompensated = exports.getTotalEnergyConsumption = exports.getTotalCustomers = exports.getTotalInvoices = void 0;
const prisma_1 = require("../../utils/prisma");
const date_fns_1 = require("date-fns");
const sort_by_month_1 = require("../../utils/sort-by-month");
function getTotalInvoices() {
    return __awaiter(this, void 0, void 0, function* () {
        const totalInvoices = yield prisma_1.db.invoice.count();
        const currentDate = new Date();
        const startOfCurrentMonth = (0, date_fns_1.startOfMonth)(currentDate);
        const startOfPreviousMonth = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(currentDate, 1));
        const invoicesInCurrentMonth = yield prisma_1.db.invoice.count({
            where: {
                createdAt: {
                    gte: startOfCurrentMonth,
                },
            },
        });
        const invoicesInPreviousMonth = yield prisma_1.db.invoice.count({
            where: {
                createdAt: {
                    gte: startOfPreviousMonth,
                    lt: startOfCurrentMonth,
                },
            },
        });
        const difference = invoicesInCurrentMonth - invoicesInPreviousMonth;
        return {
            total: totalInvoices,
            difference: difference,
        };
    });
}
exports.getTotalInvoices = getTotalInvoices;
function getTotalCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        const totalCustomers = yield prisma_1.db.customer.count();
        const currentDate = new Date();
        const startOfCurrentMonth = (0, date_fns_1.startOfMonth)(currentDate);
        const startOfPreviousMonth = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(currentDate, 1));
        const customersInCurrentMonth = yield prisma_1.db.customer.count({
            where: {
                createdAt: {
                    gte: startOfCurrentMonth,
                },
            },
        });
        const customersInPreviousMonth = yield prisma_1.db.customer.count({
            where: {
                createdAt: {
                    gte: startOfPreviousMonth,
                    lt: startOfCurrentMonth,
                },
            },
        });
        const difference = customersInCurrentMonth - customersInPreviousMonth;
        return {
            total: totalCustomers,
            difference: difference,
        };
    });
}
exports.getTotalCustomers = getTotalCustomers;
function getTotalEnergyConsumption() {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = yield prisma_1.db.invoice.findMany();
        let total = 0;
        invoices.forEach((invoice) => {
            total += invoice.energyQuantity + (invoice.exemptEnergyQuantity || 0);
        });
        return { total };
    });
}
exports.getTotalEnergyConsumption = getTotalEnergyConsumption;
function getTotalEnergyCompensated() {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = yield prisma_1.db.invoice.findMany();
        let total = 0;
        invoices.forEach((invoice) => {
            total += invoice.compensatedEnergyQuantity || 0;
        });
        return { total };
    });
}
exports.getTotalEnergyCompensated = getTotalEnergyCompensated;
function getEnergyStats(customerNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = yield prisma_1.db.invoice.findMany({
            where: {
                customerId: customerNumber,
            },
        });
        const energyStats = {};
        invoices.forEach((invoice) => {
            const { referenceMonth, energyQuantity, exemptEnergyQuantity, compensatedEnergyQuantity, } = invoice;
            if (!energyStats[referenceMonth]) {
                energyStats[referenceMonth] = {
                    energyConsumption: 0,
                    energyCompensated: 0,
                };
            }
            const energyConsumption = energyQuantity + (exemptEnergyQuantity || 0);
            const energyCompensated = compensatedEnergyQuantity || 0;
            energyStats[referenceMonth].energyConsumption += energyConsumption;
            energyStats[referenceMonth].energyCompensated += energyCompensated;
        });
        const data = Object.keys(energyStats)
            .map((referenceMonth) => ({
            referenceMonth,
            energyConsumption: energyStats[referenceMonth].energyConsumption,
            energyCompensated: energyStats[referenceMonth].energyCompensated,
        }))
            .sort(sort_by_month_1.sortByMonth);
        return data;
    });
}
exports.getEnergyStats = getEnergyStats;
function getEnergyValues(customerNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = yield prisma_1.db.invoice.findMany({
            where: {
                customerId: customerNumber,
            },
        });
        const energyStats = {};
        invoices.forEach((invoice) => {
            const { referenceMonth, energyAmount, exemptEnergyAmount, municipalPublicLightingContribution, compensatedEnergyAmount, } = invoice;
            if (!energyStats[referenceMonth]) {
                energyStats[referenceMonth] = {
                    consumedEnergyValue: 0,
                    compensatedEnergyValue: 0,
                };
            }
            const consumedEnergyValue = Number(energyAmount) +
                Number(exemptEnergyAmount || 0) +
                Number(municipalPublicLightingContribution);
            const compensatedEnergyValue = Number(compensatedEnergyAmount) || 0;
            energyStats[referenceMonth].consumedEnergyValue += consumedEnergyValue;
            energyStats[referenceMonth].compensatedEnergyValue +=
                compensatedEnergyValue;
        });
        const data = Object.keys(energyStats)
            .map((referenceMonth) => ({
            referenceMonth,
            consumedEnergyValue: energyStats[referenceMonth].consumedEnergyValue,
            compensatedEnergyValue: energyStats[referenceMonth].compensatedEnergyValue,
        }))
            .sort(sort_by_month_1.sortByMonth);
        return data;
    });
}
exports.getEnergyValues = getEnergyValues;
//# sourceMappingURL=metrics.service.js.map