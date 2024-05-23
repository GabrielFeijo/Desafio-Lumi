"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByMonth = void 0;
const monthsOrder = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
];
const sortByMonth = (a, b) => {
    const [monthA, yearA] = a.referenceMonth.split('/');
    const [monthB, yearB] = b.referenceMonth.split('/');
    const yearDiff = parseInt(yearA) - parseInt(yearB);
    if (yearDiff !== 0) {
        return yearDiff;
    }
    return monthsOrder.indexOf(monthA) - monthsOrder.indexOf(monthB);
};
exports.sortByMonth = sortByMonth;
//# sourceMappingURL=sort-by-month.js.map